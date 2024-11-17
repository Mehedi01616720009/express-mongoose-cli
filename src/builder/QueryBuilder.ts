import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    constructor(
        public modelQuery: Query<T[], T>,
        public query: Record<string, unknown>
    ) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    // searchable query
    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    field =>
                        ({
                            [field]: { $regex: searchTerm, $options: 'i' },
                        } as FilterQuery<T>)
                ),
            });
        }

        return this;
    }

    // filter query
    filter() {
        const queryObj = { ...this?.query };
        const excludeTerms = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
        excludeTerms.forEach(term => delete queryObj[term]);

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        return this;
    }

    // sorting
    sort() {
        const sort = (this?.query?.sort as string)
            ? (this?.query?.sort as string).split(',').join(' ')
            : '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);
        return this;
    }

    // paginate
    paginate() {
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const skip = (page - 1) * limit || 0;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }

    // filter fields projection
    fields() {
        const fields = (this?.query?.fields as string)
            ? (this?.query?.fields as string).split(',').join(' ')
            : '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }

    async countTotal() {
        const queries = this.modelQuery.getFilter();
        const totalDoc = await this.modelQuery.model.countDocuments(queries);

        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const totalPageCount = Math.ceil(totalDoc / limit);
        const totalPage = totalPageCount !== 0 ? totalPageCount : 1;

        return {
            page,
            limit,
            totalPage,
            totalDoc,
        };
    }
}

export default QueryBuilder;
