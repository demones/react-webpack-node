import test from 'ava';
import {actionTest} from 'redux-ava';
import {typing} from '../../actions/vote';
import {TYPING} from '../../constants/VoteActionTypes';

test('调用 typing，返回期望的对象值', actionTest(typing, '投票', {type: TYPING, newTopic: '投票'}));
