const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const exts = ['.js', '.jsx', '.ts', '.tsx'];

function walk(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else if (exts.includes(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function readFile(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (e) {
    return '';
  }
}

function resolveImport(fromFile, importPath) {
  if (!importPath.startsWith('.')) return null; // only local
  const base = path.dirname(fromFile);
  const candidate = path.resolve(base, importPath);
  // try file with extension
  for (const e of exts) {
    const f = candidate + e;
    if (fs.existsSync(f)) return f;
  }
  // try index files in folder
  for (const e of exts) {
    const f = path.join(candidate, 'index' + e);
    if (fs.existsSync(f)) return f;
  }
  // if exact file exists
  if (fs.existsSync(candidate)) return candidate;
  return null;
}

function shortId(file) {
  return path.relative(SRC, file).replace(/\\/g, '/');
}

function sanitizeLabel(s) {
  return s.replace(/"/g, '\\"');
}

(function main() {
  const files = walk(SRC);
  const edges = [];
  const nodes = new Set();

  const importRegex = /(?:import\s+(?:[^'";]+)\s+from\s+|require\()\s*['"]([^'"]+)['"]/g;

  for (const file of files) {
    const content = readFile(file);
    const from = shortId(file);
    nodes.add(from);
    let m;
    while ((m = importRegex.exec(content))) {
      const imp = m[1];
      const resolved = resolveImport(file, imp);
      if (resolved && resolved.startsWith(SRC)) {
        const to = shortId(resolved);
        nodes.add(to);
        edges.push([from, to]);
      }
    }
  }

  // produce mermaid
  const lines = ['```mermaid', 'graph TD'];
  // create node labels for readability
  for (const n of nodes) {
    const id = n.replace(/[^a-zA-Z0-9_]/g, '_');
    lines.push(`  ${id}["${sanitizeLabel(n)}"]`);
  }
  for (const [a, b] of edges) {
    const ida = a.replace(/[^a-zA-Z0-9_]/g, '_');
    const idb = b.replace(/[^a-zA-Z0-9_]/g, '_');
    lines.push(`  ${ida} --> ${idb}`);
  }
  lines.push('```');

  const out = path.join(SRC, 'dep-graph.mmd');
  fs.writeFileSync(out, lines.join('\n'), 'utf8');

  // summary
  const byInDegree = {}; const byOutDegree = {};
  for (const n of nodes) { byInDegree[n]=0; byOutDegree[n]=0; }
  for (const [a,b] of edges) { byOutDegree[a]++; byInDegree[b]++; }
  const totalNodes = nodes.size; const totalEdges = edges.length;
  const topUsed = Object.entries(byInDegree).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const summary = {
    totalNodes, totalEdges, topUsed
  };
  fs.writeFileSync(path.join(SRC,'dep-summary.json'), JSON.stringify(summary, null, 2), 'utf8');

  console.log('Wrote', out);
})();
