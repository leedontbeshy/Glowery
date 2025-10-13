// @ts-nocheck
import {UserRepository} from '../../src/core/user/user.repository'

async function testUser() {
    const result = await UserRepository.findUserByEmail('');
    console.log(result);
};

testUser();