#!/usr/bin/env node

const fs = require('fs');
const argv = require('yargs').argv;

const coverageStr = fs.readFileSync(argv.i, 'utf-8');
const coverage = JSON.parse(coverageStr);

const newCoverage = {};

for (var src in coverage) {
    const re = new RegExp("^(src/.*[.]ts)$");
    const m = re.exec(src);
    if (m == null)
        continue;
    if (src.includes('test.ts'))
        continue;
    newCoverage[m[1]] = coverage[src];
}

const newCoverageStr = JSON.stringify(newCoverage);
fs.writeFileSync(argv.o, newCoverageStr, 'utf-8');
