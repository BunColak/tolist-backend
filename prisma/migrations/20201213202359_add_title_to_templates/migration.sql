/*
  Warnings:

  - Added the required column `title` to the `ListTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListTemplate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);
INSERT INTO "new_ListTemplate" ("id") SELECT "id" FROM "ListTemplate";
DROP TABLE "ListTemplate";
ALTER TABLE "new_ListTemplate" RENAME TO "ListTemplate";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
