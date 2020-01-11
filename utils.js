function cleanup(svg) {
    const sketchGeneratorString = '<!-- Generator: Sketch 52.6 (67491) - http://www.bohemiancoding.com/sketch -->';
    const sketchDescriptionString = '<desc>Created with Sketch.</desc>';
    // id=".[^\s]{1,}"
    return svg.replace(/id=".[^\s]{1,}"/g, '')
        .replace(sketchGeneratorString, '')
        .replace(sketchDescriptionString, '')
        .replace('  ', ' ')
        .replace('  ', ' ')
        .replace('\n\n', '\n')
}

function kebabToCamel(kababName) {
    return kababName.replace(/([-_][a-z,0-9])/ig, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
}

module.exports = {
    cleanup,
    kebabToCame: kebabToCamel,
};
