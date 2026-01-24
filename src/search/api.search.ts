import {FilterQuery, ProjectionType} from "mongoose";
import {SortQuery} from "../types/SortQuery.ts";
import {ExperimentalQueryType} from "../types/QueryType.ts";

type PrismaQueryType<T,K extends Record<string, string>> = {
    filter: T,
    order?: K,
    limit: number,
    skip: number
    projection?: ProjectionType<T>
}

type MongooseQueryType<T,K extends Record<string, string>> = {
    filter: FilterQuery<T>,
    sort?: SortQuery<K>,
    limit: number,
    skip: number
    projection?: ProjectionType<T>
}
//

class ApiMongooseSearch<T,K extends Record<string, string>,M extends Record<string, string>> {
    
    constructor(public mongooseQuery: MongooseQueryType<T,M>, public query: ExperimentalQueryType<K,M>){}

    filter() {
        const {page, limit, skip, sort, ...filter} = this.query
        let queryString = JSON.stringify(filter);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.mongooseQuery.filter = JSON.parse(queryString) as FilterQuery<T>
        return this
    }

    sort() {
        const {sort} = this.query
        if(sort){
            this.mongooseQuery.sort = sort
        }
        return this
    }

    pagination(){
        const {page, limit, skip} = this.query
        this.mongooseQuery.limit = limit
        this.mongooseQuery.skip = (page-1)*limit + skip
        return this
    }

}

class ApiPrismaSearch<T,K extends Record<string, string>,M extends Record<string, string>> {

    constructor(public mongooseQuery: MongooseQueryType<T,M>, public query: ExperimentalQueryType<K,M>){}

    filter() {
        const {page, limit, skip, sort, ...filter} = this.query
        let queryString = JSON.stringify(filter);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.mongooseQuery.filter = JSON.parse(queryString) as FilterQuery<T>
        return this
    }

    sort() {
        const {sort} = this.query
        if(sort){
            this.mongooseQuery.sort = sort
        }
        return this
    }

    pagination(){
        const {page, limit, skip} = this.query
        this.mongooseQuery.limit = limit
        this.mongooseQuery.skip = (page-1)*limit + skip
        return this
    }

}