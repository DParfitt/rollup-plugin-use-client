import type { Plugin, OutputAsset, OutputChunk } from "rollup";
import path from "path";

const isOutputChunk = (
	moduleChunk: OutputChunk | OutputAsset,
): moduleChunk is OutputChunk => "code" in moduleChunk;

const filesToTransform = new Map<string, string>();

export type RollupPluginUseClientProps = {
	directive?: string;
};

export type UseClientPlugin = (props?: RollupPluginUseClientProps) => Plugin;

export const rollupPluginUseClient: UseClientPlugin = ({
	directive = "use client",
} = {}) => ({
	name: "rollup-plugin-use-client",
	transform(code, id) {
		if (code.match(new RegExp(`^['"]${directive}['"];`, "m"))) {
			const file = path.parse(
				path.relative(`${process.cwd()}${path.sep}src`, id),
			);
			filesToTransform.set(
				`${file.dir}${file.dir ? path.sep : ""}${file.name}`,
				code,
			);
		}
	},
	generateBundle(_outputOptions, bundle) {
		const keys = Object.keys(bundle);

		for (const moduleId of keys) {
			const outputModule = bundle[moduleId] as OutputAsset | OutputChunk;

			const file = path.parse(moduleId);

			if (
				isOutputChunk(outputModule) &&
				filesToTransform.has(
					`${file.dir}${file.dir ? path.sep : ""}${file.name}`,
				)
			) {
				outputModule.code = `'${directive}';\n${outputModule.code}`;
			}
		}
	},
});

export default rollupPluginUseClient;
