import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';

const typeDefs = `

scalar Upload

type Query {
  getFileModel: String!
}

type Mutation {
  uploadPictures(fileInput: Upload!): String!
}

type Mutation {
  foo() : String;
}

`;

const customTypeDefs = `
scalar Upload

type File {
    filename: String!
    mimetype: String!
    encoding: String!
}

type Query {
  uploads: [File]
}

type Mutation {
  singleUpload(file: Upload!): String!
}
`;

@Module({
  imports: [
    GraphQLModule.forRoot({
      // autoSchemaFile: 'schema.gql',
      playground: true,
      useGlobalPrefix: true,
      introspection: true,
      typeDefs: [customTypeDefs],
      // resolvers: { Upload: GraphQLUpload },
      uploads: {
        maxFileSize: 10 * 1024 * 1024, // 10 MB
        maxFiles: 1,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
