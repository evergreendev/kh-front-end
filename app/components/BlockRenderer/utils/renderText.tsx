import React, {Fragment} from "react";
import Link from "next/link";
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

    formats?.forEach(format => {
        className += " " + styles[format as keyof {}];
    })

    return className;
}

const FormattedText = ({formats, children}: { formats: string[], children: React.ReactNode }) => {
    const curr = formats?.pop();

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

    if (formats?.length === 0) {
        return <>{children}</>
    }
}

function renderText(root: any, key: number, id:string, styleOverride?: string) {
    if (!root) return;

    const children = root.children?.map((child: any) => {
        return renderText(child, key + 1, id, styleOverride);
    });

    switch (root.type) {
        case "root":
            break;
        case "heading":
            switch (root.tag) {
                case "h1":
                    return <h1 key={key}
                               className={`mb-6 text-4xl font-bold underline underline-offset-8 decoration-brand-yellow decoration-4 font-ptserif ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}</h1>
                case "h2":
                    return <h2 key={key}
                               className={`mb-6 text-4xl font-bold underline underline-offset-8 decoration-brand-yellow decoration-4 font-ptserif ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}</h2>
                case "h3":
                    return <h3 key={key}
                               className={`mb-3 text-3xl font-bold font-ptserif ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}</h3>
                case "h4":
                    return <h4 key={key}
                               className={`mb-3 text-2xl font-bold ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}</h4>
                case "h5":
                    return <h5 key={key}
                               className={`mb-3 text-xl font-bold ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}</h5>
                case "h6":
                    return <h6 key={key}
                               className={`mb-2 text-lg ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}</h6>
                default:
                    return <Fragment key={key}></Fragment>
            }
        case "paragraph":
            return root.children?.length > 0 ? <p key={key}
                      className={`${styleOverride||"text-lg max-w-[58ch] font-opensans"}   mx-auto 
                      ${alignment[root.format as keyof {}]||""}
                      
                      `}>{root.children.map((child: any) => {
                return renderText(child, key + 1, id, styleOverride);
            })}</p> : <br key={key}/>
        case "text":
            return <FormattedText key={key} formats={lexicalFormats[root.format]}>
                <span  className={`${getStyles(lexicalFormats[root.format])||""}`}>{root.text}</span>
            </FormattedText>
        case "horizontalrule":
            return <hr key={key} className="my-3"/>
        case "link":
            return root.fields.linkType === "internal" ?
                <Link key={key} className={`underline text-slate-700 ${alignment[root.format as keyof {}]}`}
                      href={root.fields.doc.value?.full_path}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}</Link> :
                <a key={key} className={`underline text-slate-700 ${alignment[root.format as keyof {}]}`}
                   href={root.fields.url} rel={root.fields.newTab ? "noopener noreferrer" : ""}
                   target={root.fields.newTab ? "_blank" : ""}>
                    {root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}
                </a>
        case "relationship":
            return <Button key={key} text={root.value.title} href={"/" + root.value?.full_path}/>
        case "list":
            if (root.tag === "ol") {
                return <ol key={key}
                           className={`list-decimal list-inside pl-2 ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}</ol>
            }
            return <ul key={key}
                       className={`list-disc pl-2 list-inside ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}</ul>
        case "listitem":
            return <li key={key}
                       className={`${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}</li>
        case "quote":
            return <blockquote key={key}
                               className={`border-l-2 pl-6 py-4 ${alignment[root.format as keyof {}]}`}>{root.children.map((child: any) => renderText(child, key + 1, id, styleOverride))}</blockquote>
        default:
            break;
    }


    return children;
}


export default renderText;
