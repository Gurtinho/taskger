-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT,
    "content" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 1,
    "concluded" BOOLEAN NOT NULL DEFAULT false,
    "task_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "options_task_id_key" ON "options"("task_id");

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
