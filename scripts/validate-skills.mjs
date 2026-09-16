import path from "node:path";
import {
	discoverSkills,
	pathExists,
	relativePath,
} from "./lib/skills.mjs";

const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const errors = [];
const warnings = [];

let skills = [];

try {
	skills = await discoverSkills();
} catch (error) {
	errors.push(error.message);
}

for (const skill of skills) {
	const { directoryName, frontmatter, manifestPath, body } = skill;
	const label = relativePath(manifestPath);

	validateRequiredString(frontmatter, "name", 64, label);
	validateRequiredString(frontmatter, "description", 1024, label);
	validateOptionalString(frontmatter, "license", label);
	validateOptionalString(frontmatter, "compatibility", label, 500);
	validateOptionalString(frontmatter, "allowed-tools", label);

	if (typeof frontmatter.name === "string") {
		if (!NAME_PATTERN.test(frontmatter.name)) {
			errors.push(
				`${label}: name must use lowercase letters, numbers, and single hyphens.`,
			);
		}

		if (frontmatter.name !== directoryName) {
			errors.push(
				`${label}: name "${frontmatter.name}" must match directory "${directoryName}".`,
			);
		}
	}

	if ("metadata" in frontmatter) {
		const metadata = frontmatter.metadata;

		if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
			errors.push(`${label}: metadata must be a mapping.`);
		} else {
			for (const [key, value] of Object.entries(metadata)) {
				if (typeof value !== "string") {
					errors.push(`${label}: metadata.${key} must be a string.`);
				}
			}
		}
	}

	const lineCount = skill.source.split(/\r?\n/).length;
	if (lineCount > 500) {
		warnings.push(
			`${label}: ${lineCount} lines; consider moving detail into references/.`,
		);
	}

	await validateLocalLinks(skill, body);
}

warnings.forEach((warning) => console.warn(`Warning: ${warning}`));

if (errors.length) {
	console.error(`Validation failed with ${errors.length} error(s):`);
	errors.forEach((error) => console.error(`- ${error}`));
	process.exitCode = 1;
} else {
	console.log(`Validated ${skills.length} skill(s).`);
}

function validateRequiredString(frontmatter, field, maxLength, label) {
	const value = frontmatter[field];

	if (typeof value !== "string" || !value.trim()) {
		errors.push(`${label}: ${field} must be a non-empty string.`);
		return;
	}

	if (value.length > maxLength) {
		errors.push(`${label}: ${field} must be at most ${maxLength} characters.`);
	}
}

function validateOptionalString(frontmatter, field, label, maxLength) {
	if (!(field in frontmatter)) return;

	const value = frontmatter[field];
	if (typeof value !== "string" || !value.trim()) {
		errors.push(`${label}: ${field} must be a non-empty string when provided.`);
		return;
	}

	if (maxLength && value.length > maxLength) {
		errors.push(`${label}: ${field} must be at most ${maxLength} characters.`);
	}
}

async function validateLocalLinks(skill, body) {
	const links = body.matchAll(/\]\(([^)]+)\)/g);

	for (const match of links) {
		const href = match[1].trim().replace(/^<|>$/g, "");
		if (
			!href ||
			href.startsWith("#") ||
			href.startsWith("/") ||
			/^[a-z][a-z\d+.-]*:/i.test(href)
		) {
			continue;
		}

		let decodedPath;

		try {
			decodedPath = decodeURIComponent(href.split("#", 1)[0]);
		} catch {
			errors.push(
				`${relativePath(skill.manifestPath)}: invalid encoded link "${href}".`,
			);
			continue;
		}

		const targetPath = path.resolve(skill.directory, decodedPath);
		const isInsideSkill =
			targetPath === skill.directory ||
			targetPath.startsWith(`${skill.directory}${path.sep}`);

		if (!isInsideSkill) {
			errors.push(
				`${relativePath(skill.manifestPath)}: link escapes the skill directory: ${href}`,
			);
		} else if (!(await pathExists(targetPath))) {
			errors.push(
				`${relativePath(skill.manifestPath)}: linked file does not exist: ${href}`,
			);
		}
	}
}
