import {prisma} from "../../prisma/prisma.client.ts";
import type {Role} from "../../prisma/src/generated/prisma/client.ts";

class RoleRepository{
    public async getByName(name: string): Promise<Role | null>{
        return await prisma.role.findFirst({where: {name}})
    }

    public async getById(id: number): Promise<Role | null>{
        return await prisma.role.findUnique({where: {id}})
    }

}

export const roleRepository = new RoleRepository()

