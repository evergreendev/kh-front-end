import {Page} from "@/app/types/payloadTypes";
import Link from "next/link";
import React, {Fragment} from "react";
import Button from "@/app/components/Button";

function getFormats() {
    const lexicalFormats = [[""]]
    lexicalFormats[1] = ["bold"]
    lexicalFormats[2] = ["italic"]
    lexicalFormats[4] = ["strike"]
    lexicalFormats[8] = ["underline"]
    lexicalFormats[16] = ["code"]
    lexicalFormats[32] = ["subscript"]
    lexicalFormats[64] = ["superscript"]

    let closestSingleI = 1;

    for (let i = 1; i <= 127; i++) {
        if (lexicalFormats[i]?.length === 1) {
            closestSingleI = i;
        }

        if (!lexicalFormats[i]) {
            lexicalFormats[i] = [lexicalFormats[closestSingleI][0]];

            const indexToFind = i - closestSingleI;
            lexicalFormats[i] = lexicalFormats[i].concat(lexicalFormats[indexToFind]);
        }
    }

    return lexicalFormats;
}

const lexicalFormats = getFormats();

const styles = {
    bold: "font-bold",
    italic: "italic",
    strike: "line-through",
    underline: "underline",
    code: "",
    subscript: "",
    superscript: "",
}
const alignment = {
    center: "text-center",
    left: "text-left",
    right: "text-right",
    justify: "text-justify",
}

function getStyles(formats: string[]) {
    let className = "";

    formats.forEach(format => {
        className += " " + styles[format as keyof {}];
    })

    return className;
}

const FormattedText = ({formats, children}: { formats: string[], children: React.ReactNode }) => {
    const curr = formats.pop();

    if (curr) {
        switch (curr) {
            case "code":
                return <code><FormattedText formats={formats}>
                    {children}
                </FormattedText> </code>
            case "subscript":
                return <sub><FormattedText formats={formats}>{children}</FormattedText></sub>
            case "superscript":
                return <sup><FormattedText formats={formats}>{children}</FormattedText></sup>
            default:
                return <FormattedText formats={formats}>
                    {children}
                </FormattedText>
        }

    }

    if (formats.length === 0) {
        return <>{children}</>
    }
}


function renderText(root: any, key: number) {
    if (!root) return;

    const children = root.children?.map((child: any) => {
        return renderText(child, key + 1);
    });

    switch (root.type) {
        case "root":
            break;
        case "heading":
            switch (root.tag) {
                case "h1":
                    return <h1 key={key}
                               className={`mb-6 text-4xl font-bold border-b-brand-yellow border-b-4 font-ptserif ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1))}</h1>
                case "h2":
                    return <h2 key={key}
                               className={`mb-6 text-4xl font-bold border-b-brand-yellow border-b-4 font-ptserif ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1))}</h2>
                case "h3":
                    return <h3 key={key}
                               className={`mb-3 text-3xl font-bold font-ptserif ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1))}</h3>
                case "h4":
                    return <h4 key={key}
                               className={`mb-3 text-2xl font-bold ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1))}</h4>
                case "h5":
                    return <h5 key={key}
                               className={`mb-3 text-xl font-bold ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1))}</h5>
                case "h6":
                    return <h6 key={key}
                               className={`mb-2 text-lg ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1))}</h6>
                default:
                    return <Fragment key={key}></Fragment>
            }
        case "paragraph":
            return <p key={key}
                      className={`mb-6 font-ptserif text-xl max-w-[58ch] mx-auto ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => {
                return renderText(child, key + 1);
            })}</p>
        case "text":
            return <FormattedText formats={lexicalFormats[root.format]}>
                <span key={key} className={`${getStyles(lexicalFormats[root.format])}`}>{root.text}</span>
            </FormattedText>
        case "horizontalrule":
            return <hr key={key} className="my-3"/>
        case "link":
            return root.fields.linkType === "internal" ?
                <Link key={key} className={`underline text-slate-700 ${alignment[root.format as keyof {}]}`}
                      href={root.fields.doc.value?.full_path}>{root.children.map((child: any) => renderText(child, key + 1))}</Link> :
                <a key={key} className={`underline text-slate-700 ${alignment[root.format as keyof {}]}`}
                   href={root.fields.url} rel={root.fields.newTab ? "noopener noreferrer" : ""}
                   target={root.fields.newTab ? "_blank" : ""}>
                    {root.children.map((child: any) => renderText(child, key + 1))}
                </a>
        case "relationship":
            return <Button key={key} text={root.value.title} href={"/" + root.value?.full_path}/>
        case "list":
            if (root.tag === "ol") {
                return <ol key={key}
                           className={`list-decimal list-inside pl-2 ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1))}</ol>
            }
            return <ul key={key}
                       className={`list-disc pl-2 list-inside ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1))}</ul>
        case "listitem":
            return <li key={key}
                       className={`${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1))}</li>
        case "quote":
            return <blockquote key={key}
                               className={`border-l-2 pl-6 py-4 ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1))}</blockquote>

        default:
            break;
    }


    return children;
}

const TextBlock = ({block}: {
    block: {
        heading_1?: string | null;
        heading_2?: string | null;
        heading_link?: {
            title?: string | null;
            external?: boolean | null;
            Relation?: {
                relationTo: 'pages';
                value: number | Page;
            } | null;
            external_url?: string | null;
            label?: string | null;
        };
        body?: {
            text?: {
                root: {
                    type: string;
                    children: {
                        type: string;
                        version: number;
                        [k: string]: unknown;
                    }[];
                    direction: ('ltr' | 'rtl') | null;
                    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                    indent: number;
                    version: number;
                };
                [k: string]: unknown;
            } | null;
            text_html?: string | null;
            link_list?:
                | {
                title?: string | null;
                external?: boolean | null;
                Relation?: {
                    relationTo: 'pages';
                    value: number | Page;
                } | null;
                external_url?: string | null;
                label?: string | null;
                id?: string | null;
            }[]
                | null;
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'TextBlock';
    }
}) => {
    return <div>
        <div className="mb-6">
            {
                block.heading_1 ?
                    <div className="flex justify-center"><h2
                        className="mb-2 text-center text-4xl font-bold border-b-brand-yellow border-b-4 font-ptserif">{block.heading_1}</h2>
                    </div> : ""
            }
            {
                block.heading_2 ?
                    <h2 className="text-center font-ptserif text-2xl mx-auto w-[15em]">{block.heading_2}</h2> : ""
            }
            {
                block.heading_link
                    ? block?.heading_link?.external
                        ? <div
                            className="text-xl text-center font-ptserif italic">{block.heading_link?.label ? block.heading_link?.title + " " : ""}<a
                            className="font-ptserif underline"
                            href={block.heading_link?.external_url || ""}>{block.heading_link?.label ? block.heading_link?.label : block.heading_link?.title}</a></div>
                        : <div className="text-xl text-center font-ptserif italic">{block.heading_link?.label ? block.heading_link?.title + " " : ""}<Link
                            className="font-ptserif underline"
                            href={"/" + (block.heading_link?.Relation?.value as Page)?.full_path}>{block.heading_link?.label ? block.heading_link?.label : block.heading_link?.title}</Link>
                        </div>
                    : ""
            }
        </div>
        {
            renderText(block.body?.text?.root, 1)
        }
        {
            block.body?.link_list?.map(item => {
                return item.external
                    ? <div className="text-xl text-center font-ptserif italic">{item.label ? item.title + " " : ""}<a
                        className="font-ptserif underline"
                        href={item.external_url || ""}>{item.label ? item.label : item.title}</a></div>
                    : <div className="text-xl text-center font-ptserif italic">{item.label ? item.title + " " : ""}<Link
                        className="font-ptserif underline"
                        href={"/" + (item.Relation?.value as Page)?.full_path}>{item.label ? item.label : item.title}</Link>
                    </div>
            })
        }
    </div>
}

export default TextBlock;
