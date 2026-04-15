import fs from "fs";
import bcrypt from "bcryptjs";

const env = fs.readFileSync(".env.local", "utf8");
const line = env.split(/\r?\n/).find((l) => l.startsWith("ADMIN_PASSWORD_HASH="));
const raw = line ? line.split("=").slice(1).join("=") : "";
const hash = raw.replace(/^"|"$/g, "");

console.log("hash", hash);
console.log("compare", bcrypt.compareSync("Admin14U", hash));
