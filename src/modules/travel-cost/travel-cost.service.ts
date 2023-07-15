import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { GlobalService } from '../global/global.service';
import { DataDto } from './dto/data.dto';

interface ICompanyCost {
    id: string;
    createdAt: string;
    name: string;
    parentId: string;
    cost: number;
}

const treeRoot = (items, id = null) =>
    items.filter(item => item['id'] === id)

const treeBranch = (items, id = null, link = 'parentId') =>
    items
        .filter(item => item[link] === id)
        .map(item => ({ ...item, children: treeBranch(items, item.id) }));

const buildTree = (root, branch) =>
    [{ ...root[0], children: branch }]

const calSingleCost = (item) => {
    if (item.children.length > 0) {
        let temp_cost = item.cost | 0;
        item.children
            .map(child => {
                const childCost = calSingleCost(child);
                temp_cost += childCost;
            })
        item.cost = temp_cost
        return item.cost
    }
    return item.cost
}

const updateCost = (items) =>
    items.forEach(item => item.cost = calSingleCost(item))

@Injectable()
export class TravelCostService implements OnModuleInit {

    companyList: any[] = [];
    travelList: any[] = [];
    companyCost: ICompanyCost[] = [];

    constructor(private readonly globalService: GlobalService) { }

    async onModuleInit() {
        const resp_company = await this.globalService.fetchDataUrl({
            url: 'https://5f27781bf5d27e001612e057.mockapi.io/webprovise/companies',
            method: 'GET',
        });
        this.companyList = resp_company.data;
        const resp_travel = await this.globalService.fetchDataUrl({
            url: 'https://5f27781bf5d27e001612e057.mockapi.io/webprovise/travels',
            method: 'GET',
        });
        this.travelList = resp_travel.data;
        this.companyCost = await this.createTravelCostByCompany(this.travelList, this.companyList);
    }

    async calCostByCompany(id: string, data: any): Promise<number> {
        return data
            .filter(item => item.companyId === id)
            .reduce((total, item) => parseFloat(total) + parseFloat(item.price), 0);
    }

    async createTravelCostByCompany(empList: any[], companyList: any[]): Promise<ICompanyCost[]> {
        const result: ICompanyCost[] = [];

        for (const company of companyList) {
            const cost = await this.calCostByCompany(company.id, empList);
            result.push({
                id: company.id,
                createdAt: company.createdAt,
                name: company.name,
                parentId: company.parentId,
                cost: cost
            });
        }
        return result;
    }

    async companyCostTree(id: string): Promise<DataDto[]> {
        const companyTree = buildTree(treeRoot(this.companyCost, id), treeBranch(this.companyCost, id))
        updateCost(companyTree);
        return companyTree;
    }
}