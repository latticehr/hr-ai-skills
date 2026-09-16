import { readFile, writeFile } from "node:fs/promises";
import {
	catalogPath,
	discoverSkills,
	relativeUrlPath,
	repositorySlug,
} from "./lib/skills.mjs";

const checkOnly = process.argv.includes("--check");
const skills = await discoverSkills();

const catalog = {
	schemaVersion: 1,
	repository: repositorySlug,
	skills: skills.map((skill) => {
		const skillPath = relativeUrlPath(skill.directory);
		const manifestPath = relativeUrlPath(skill.manifestPath);

		return {
			name: skill.frontmatter.name,
			description: skill.frontmatter.description,
			path: skillPath,
			sourceUrl: `https://github.com/${repositorySlug}/tree/main/${skillPath}`,
			rawUrl: `https://raw.githubusercontent.com/${repositorySlug}/main/${manifestPath}`,
			installCommand: `npx skills add ${repositorySlug} --skill ${skill.frontmatter.name}`,
			...(skill.frontmatter.compatibility
				? { compatibility: skill.frontmatter.compatibility }
				: {}),
			...(skill.frontmatter.metadata
				? { metadata: skill.frontmatter.metadata }
				: {}),
		};
	}),
};

const output = `${JSON.stringify(catalog, null, 2)}\n`;

if (checkOnly) {
	let currentOutput = "";

	try {
		currentOutput = await readFile(catalogPath, "utf8");
	} catch {
		console.error("catalog.json is missing. Run npm run catalog.");
		process.exitCode = 1;
	}

	if (currentOutput && currentOutput !== output) {
		console.error("catalog.json is out of date. Run npm run catalog.");
		process.exitCode = 1;
	}

	if (!process.exitCode) {
		console.log(`Catalog is current (${skills.length} skill(s)).`);
	}
} else {
	await writeFile(catalogPath, output);
	console.log(`Wrote catalog.json with ${skills.length} skill(s).`);
}
