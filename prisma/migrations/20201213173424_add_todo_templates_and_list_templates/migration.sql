-- CreateTable
CREATE TABLE "TodoTemplate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "listTemplateId" INTEGER NOT NULL,

    FOREIGN KEY ("listTemplateId") REFERENCES "ListTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ListTemplate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
