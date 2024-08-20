export default function BrushButton(className: string, child: string): string {
    return `
    <button type="button" id="${className}">
        ${child}
    </button>
    `
}
