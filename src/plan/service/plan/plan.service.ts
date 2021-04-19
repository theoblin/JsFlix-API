import { Injectable } from '@nestjs/common';
import {PlanEntity} from "../../model/plan.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {AccountEntity} from "../../../account/model/account.entity";
import {Repository} from "typeorm";
import {from} from "rxjs";

@Injectable()
export class PlanService {

    constructor(
        @InjectRepository(PlanEntity)
        private readonly planEntityRepository: Repository<PlanEntity>,
        @InjectRepository(AccountEntity)
        private readonly accountEntityRepository: Repository<AccountEntity>,
    ) {}

     async getAccountPlan(id) {
        return await from(this.planEntityRepository.createQueryBuilder("plan")
            .leftJoinAndSelect("plan.account", "account")
            .where("account.id = :id", {id: id.id})
            .getMany())
    }
}
