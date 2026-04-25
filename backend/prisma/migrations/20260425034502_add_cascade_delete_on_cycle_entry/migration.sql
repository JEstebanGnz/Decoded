-- DropForeignKey
ALTER TABLE "CycleEntry" DROP CONSTRAINT "CycleEntry_partnerId_fkey";

-- AddForeignKey
ALTER TABLE "CycleEntry" ADD CONSTRAINT "CycleEntry_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
