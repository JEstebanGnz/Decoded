/*
  Warnings:

  - Changed the type of `currentPhase` on the `CycleEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CyclePhase" AS ENUM ('menstrual', 'follicular', 'ovulation', 'luteal');

-- AlterTable
ALTER TABLE "CycleEntry" DROP COLUMN "currentPhase",
ADD COLUMN     "currentPhase" "CyclePhase" NOT NULL;
