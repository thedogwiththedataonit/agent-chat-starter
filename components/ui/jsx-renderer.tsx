import { completeJsxTag } from "@/lib/jsx-utils";
import * as React from "react";
import JsxParser from "react-jsx-parser";

interface JsxRendererProps extends React.HTMLAttributes<HTMLDivElement> {
	jsx: string;
	fixIncompleteJsx?: boolean;
	components?: Record<string, React.ComponentType | React.ExoticComponent | (() => React.ReactNode)>;
}

const JsxRenderer = React.forwardRef<JsxParser, JsxRendererProps>(
	({ className, jsx, fixIncompleteJsx = true, components = {} }, ref) => {
		const processedJsx = React.useMemo(() => {
			return fixIncompleteJsx ? completeJsxTag(jsx) : jsx;
		}, [jsx, fixIncompleteJsx]);

		return (
			<JsxParser
				ref={ref}
				className={className}
				jsx={processedJsx}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				components={components as any}
			/>
		);
	},
);
JsxRenderer.displayName = "JsxRenderer";

export { JsxRenderer };
