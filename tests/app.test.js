import {getWeatherStringFromCode} from '../src/functions';

describe('Weather string', () => {
    it('should return a string', () => {
        expect(typeof getWeatherStringFromCode(0)).toBe('string')
    })
    it('should return a sunny', () => {
        expect(getWeatherStringFromCode(0)).toBe('SUNNY')
    })
})