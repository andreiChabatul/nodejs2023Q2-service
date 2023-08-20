-- CreateTable
CREATE TABLE "UserData" (
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_login_key" ON "UserData"("login");
