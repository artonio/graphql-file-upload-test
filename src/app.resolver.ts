import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as fs from 'fs';

const assert = require('assert').strict;
const util = require('util');

@Resolver(of => String)
export class AppResolver {
	constructor() {}

	@Mutation()
	singleUpload(@Args('file') file) {

		//	This is a regular method returning a classical Promise

		return new Promise((resolve, reject) => {

			// read from this
			const clown1 = './big_clown.webp';

			//  write to this
			const clown2 = './big_clown.' + Date.now() + '.webp';
			console.log('we hope to create a file called ' + clown2);

			//  create the read stream
			const readStream = fs.createReadStream(clown1);

			//  create the write stream
			const writeStream = fs.createWriteStream(clown2);

			//  Set up event handlers BEFORE doing any piping
			//  @docs:  https://nodejs.org/docs/latest-v11.x/api/stream.html#stream_class_stream_readable
			//  @docs:  https://nodejs.org/docs/latest-v11.x/api/stream.html#stream_class_stream_writable
			writeStream.on('pipe', piper => {
				console.log('a pipe has been added to the write stream');
			});
			readStream.on('end', () => {
				console.log('read stream ended');
			});
			writeStream.on('close', () => {
				console.log('writeStream finished');
				console.log('THIS is where we resolve our Promise');
				//	Our Promise resolves here
				resolve('yay! Done our GraphQL query');
			});
			//	Errors
			writeStream.on('error', reject);
			readStream.on('error', reject);

			//  Now start piping
			readStream.pipe(writeStream);
		});
	}
}
