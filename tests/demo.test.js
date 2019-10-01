// Démonstration basique
test('Demo addition', function (){
    const a = 2 + 1;
    expect(a).toBe(3);
    //expect(a).toBe(4);
})

describe('Démonstration calculatrice', function (){
    // Démonstration basique
    it('sould add', function (){
        const a = 2 + 1;
        expect(a).toBe(3);
    })

    // Concurrent permet lancer simultanément des tests
    it('should substract', function (){
        const a = 2 - 1;
        expect(a).toBe(1);
    })

    it('should multiply', function (){
        const a = 2 * 2;
        expect(a).toBe(4);
    })
})