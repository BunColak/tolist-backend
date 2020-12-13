/*
  Warnings:

  - You are about to drop the column `listTemplateId` on the `TodoTemplate` table. All the data in the column will be lost.
  - Added the required column `templateId` to the `TodoTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoTemplate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,

    FOREIGN KEY ("templateId") REFERENCES "ListTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TodoTemplate" ("id", "text") SELECT "id", "text" FROM "TodoTemplate";
DROP TABLE "TodoTemplate";
ALTER TABLE "new_TodoTemplate" RENAME TO "TodoTemplate";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
