import fs from "fs";
import path from "path";
import generateStockCodesContent from "./generate-stock-codes";

async function run() {
  const content = await generateStockCodesContent();

  const dir = path.join(process.cwd(), "src", "constants");
  const filePath = path.join(dir, "stockCodes.ts");

  // 디렉토리가 존재하지 않으면 생성
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log("stockCodes.ts file has been generated!");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
