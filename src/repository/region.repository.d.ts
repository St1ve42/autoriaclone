import type { Region } from "../../prisma/src/generated/prisma/client.ts";
declare class RegionRepository {
    getRegionByName(name: string): Promise<Region | null>;
    getRegionById(id: number): Promise<Region>;
}
export declare const regionRepository: RegionRepository;
export {};
//# sourceMappingURL=region.repository.d.ts.map