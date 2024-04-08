import { Db, MongoClient, SortDirection } from "mongodb";

export class MongoDB {
	databaseName: string;
	client: MongoClient;
	db?: Db;

	constructor(databaseName: string) {
		const connectionString = process.env.MONGO_DB_CONNECTION_STRING || 'mongodb://localhost:27017';
		this.client = new MongoClient(connectionString);
		this.databaseName = databaseName;
		this.initDb();
	}

	async initDb(): Promise<void> {
		await this.client.connect();
		this.db = this.client.db(this.databaseName);
	}

	changeDb(databaseName: string): void {
		this.databaseName = databaseName;
		this.db = this.client.db(databaseName);
	}

	async deleteSingleDocFromDb(collectionName: string, searchCriteria: Record<string, unknown>): Promise<unknown> {
		const collection = this.db?.collection(collectionName);
		return await collection?.deleteOne(searchCriteria);
	}

	async getSingleDocFromDb(collectionName: string, searchCriteria: Record<string, unknown>): Promise<Record<string, unknown> | null | undefined> {
		const collection = this.db?.collection(collectionName);
		return await collection?.findOne(searchCriteria);
	}

	async getArrayOfDocsFromDb(collectionName: string, searchCriteria: Record<string, unknown>, limit: number): Promise<Record<string, unknown>[] | undefined> {
		const collection = this.db?.collection(collectionName);
		return await collection?.find(searchCriteria).limit(limit).toArray();
	}

	async getArrayOfSortedDocsFromDb(collectionName: string, searchCriteria: Record<string, unknown>, sortCriteria: Record<string, SortDirection>, limit: number): Promise<Record<string, unknown>[] | undefined> {
		const collection = this.db?.collection(collectionName);
		return await collection?.find(searchCriteria).sort(sortCriteria).limit(limit).toArray();
	}
	async saveNewDocToDb(collectionName: string, doc: Record<string, unknown>): Promise<unknown> {
		const collection = this.db?.collection(collectionName);
		return await collection?.insertOne(doc);
	}
	async upsertDocInDb(collectionName: string, searchCriteria: Record<string, unknown>, update: Record<string, unknown>): Promise<unknown> {
		const collection = this.db?.collection(collectionName);
		return await collection?.updateOne(searchCriteria, { $set: update }, { upsert: true });
	}
}