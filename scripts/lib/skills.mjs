import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));

export const repositoryRoot = path.resolve(scriptsDirectory, "../..");
export const skillsDirectory = path.join(repositoryRoot, "skills");
export const catalogPath = path.join(repositoryRoot, "catalog.json");
export const repositorySlug = "latticehr/hr-ai-skills";

export async function discoverSkills() {
	const entries = await readdir(skillsDirectory, { withFileTypes: true });
	const directories = entries
		.filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
		.sort((a, b) => a.name.localeCompare(b.name));

	return Promise.all(
		directories.map(async (entry) => {
			const directory = path.join(skillsDirectory, entry.name);
			const manifestPath = path.join(directory, "SKILL.md");

			return {
				directory,
				directoryName: entry.name,
				manifestPath,
				...(await readManifest(manifestPath)),
			};
		}),
	);
}

export async function pathExists(targetPath) {
	try {
		await access(targetPath);
		return true;
	} catch {
		return false;
	}
}

async function readManifest(manifestPath) {
	const source = await readFile(manifestPath, "utf8");
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);

	if (!match) {
		throw new Error(`${relativePath(manifestPath)} is missing YAML frontmatter.`);
	}

	let frontmatter;

	try {
		frontmatter = YAML.parse(match[1]);
	} catch (error) {
		throw new Error(`${relativePath(manifestPath)} has invalid YAML: ${error.message}`);
	}

	if (!frontmatter || typeof frontmatter !== "object" || Array.isArray(frontmatter)) {
		throw new Error(`${relativePath(manifestPath)} frontmatter must be a mapping.`);
	}

	return {
		source,
		body: source.slice(match[0].length),
		frontmatter,
	};
}

export function relativePath(targetPath) {
	return path.relative(repositoryRoot, targetPath);
}

export function relativeUrlPath(targetPath) {
	return relativePath(targetPath).split(path.sep).join("/");
}
