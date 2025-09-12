import { Highlight, themes } from "prism-react-renderer";
import { useMemo, type ComponentProps } from "react";
import prod from "react/jsx-runtime";
import type { Options as RehypeReactOptions } from "rehype-react";
import { classNames } from "~/libs/classNames";

const Code = ({
  ref,
  children,
  ...props
}: ComponentProps<"code"> & {
  "data-language": string;
  "data-line": number;
  "data-inline-code": boolean;
}) => {
  const dataLine = Number(props["data-line"] ?? 0);
  const dataLanguage = props["data-language"];
  const dataInlineCode = props["data-inline-code"];
  const component = useMemo(() => {
    if (dataInlineCode) {
      return <code data-inline-code>{children}</code>;
    }
    return (
      <Highlight
        theme={themes.shadesOfPurple}
        code={String(children)}
        language={dataLanguage ?? "txt"}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => {
          const numberWidth = Math.floor(Math.log10(tokens.length)) + 1;
          return (
            <div
              style={style}
              className="overflow-x-auto rounded py-1 font-mono"
            >
              {tokens.slice(0, -1).map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  data-line={dataLine + i + 1}
                >
                  <span
                    className={`sticky left-0 z-10 inline-block bg-blue-900 px-2 text-gray-300 select-none`}
                  >
                    <span
                      className="inline-block text-right"
                      style={{ width: `${numberWidth}ex` }}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <span>
                    {line.map((token, key) => (
                      <span
                        key={key}
                        {...getTokenProps({ token })}
                        className={classNames(
                          getTokenProps({ token }).className
                        )}
                      />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          );
        }}
      </Highlight>
    );
  }, [dataInlineCode, children, dataLanguage, dataLine]);
  return component;
};
export const rehypeReactOptions: RehypeReactOptions = {
  ...prod,
  components: { code: Code },
};
