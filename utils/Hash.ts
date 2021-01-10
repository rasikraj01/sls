import * as bcrypt from 'bcryptjs';

interface HashOptions {
  saltRounds?: number;
}

const options: HashOptions = {
  saltRounds: 7,
};

export class Hash {
  static async make(rawString: string): Promise<string> {
    return await bcrypt.hash(rawString, options.saltRounds);
  }

  static async match(rawString: string, hash: string): Promise<boolean> {
    console.log(rawString, hash);
    return await bcrypt.compare(rawString, hash);
  }
}
