-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "displayname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dipartment" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "googleId" TEXT,
    "avatarUrl" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "permisionToggal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todayswork" (
    "id" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "todayswork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffWork" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "task1" TEXT,
    "task2" TEXT,
    "task3" TEXT,
    "task4" TEXT,
    "task5" TEXT,
    "task6" TEXT,
    "task7" TEXT,
    "task8" TEXT,
    "task9" TEXT,
    "task10" TEXT,
    "task11" TEXT,
    "task12" TEXT,
    "task13" TEXT,
    "task14" TEXT,
    "task15" TEXT,
    "task16" TEXT,
    "task17" TEXT,
    "task18" TEXT,
    "task19" TEXT,
    "task20" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staffWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reting" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "task1" TEXT,
    "task2" TEXT,
    "task3" TEXT,
    "task4" TEXT,
    "task5" TEXT,
    "task6" TEXT,
    "task7" TEXT,
    "task8" TEXT,
    "task9" TEXT,
    "task10" TEXT,
    "task11" TEXT,
    "task12" TEXT,
    "task13" TEXT,
    "task14" TEXT,
    "task15" TEXT,
    "task16" TEXT,
    "task17" TEXT,
    "task18" TEXT,
    "task19" TEXT,
    "task20" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todayswork" ADD CONSTRAINT "todayswork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffWork" ADD CONSTRAINT "staffWork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reting" ADD CONSTRAINT "reting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
