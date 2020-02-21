import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as fs from 'fs';

@Resolver(of => String)
export class AppResolver {
  constructor() {
  }

  @Mutation()
  async singleUpload(@Args('file') file) {
    console.log('Hello file', file);
    const fileStream = fs.createWriteStream('/Users/antonsukhovatkin/Pictures/from_node/test.png');

    // const stream = file.createReadStream();
    file.createReadStream().pipe(fileStream);
    // console.log(stream);
    return "Nice !";
  }
}
