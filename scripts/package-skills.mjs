import { createHash } from "node:crypto";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { ZipArchive } from "archiver";
import { discoverSkills, repositoryRoot } from "./lib/skills.mjs";

const outputDirectory = path.join(repositoryRoot, "dist");
const skills = await discoverSkills();
const checksums = [];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const skill of skills) {
	const fileName = `${skill.directoryName}.zip`;
	const outputPath = path.join(outputDirectory, fileName);

	await createArchive(skill.directory, skill.directoryName, outputPath);

	const archiveContents = await readFile(outputPath);
	const checksum = createHash("sha256").update(archiveContents).digest("hex");
	checksums.push(`${checksum}  ${fileName}`);
}

if (checksums.length) {
	await writeFile(
		path.join(outputDirectory, "SHA256SUMS.txt"),
		`${checksums.join("\n")}\n`,
	);
}

console.log(`Packaged ${skills.length} skill(s) in dist/.`);

function createArchive(sourceDirectory, rootDirectoryName, outputPath) {
	return new Promise((resolve, reject) => {
		const output = createWriteStream(outputPath);
		const archive = new ZipArchive({ zlib: { level: 9 } });

		output.on("close", resolve);
		output.on("error", reject);
		archive.on("error", reject);
		archive.on("warning", reject);

		archive.pipe(output);
		archive.directory(sourceDirectory, rootDirectoryName);
		archive.finalize();
	});
}
