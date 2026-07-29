import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

const templatesDir = path.resolve(__dirname, "templates");

let layoutSource: string | null = null;

function getLayout(): string {
  if (!layoutSource) {
    layoutSource = fs.readFileSync(path.join(templatesDir, "layout.html"), "utf8");
  }
  return layoutSource;
}

const templateCache = new Map<string, HandlebarsTemplateDelegate>();

function getTemplate(name: string): HandlebarsTemplateDelegate {
  if (templateCache.has(name)) return templateCache.get(name)!;
  const source = fs.readFileSync(path.join(templatesDir, `${name}.html`), "utf8");
  const compiled = Handlebars.compile(source);
  templateCache.set(name, compiled);
  return compiled;
}

export function renderEmail(templateName: string, data: Record<string, unknown>): string {
  const layout = getLayout();
  const template = getTemplate(templateName);
  const body = template(data);
  return layout.replace("{{{body}}}", body);
}
