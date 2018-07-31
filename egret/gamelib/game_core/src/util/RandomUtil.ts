/**
 *
 * @author 
 *
 */
class RandomUtil {

    private static seed: number = 19830729;
    private static result: number = 830729;
    private static a: number = 777;
    private static b: number = 22;

    public static resetSeed(): void {
        this.setSeed((new Date()).valueOf());
    }

    public static setSeed(seed: number): void {
        RandomUtil.seed = seed;
        RandomUtil.result = RandomUtil.seed;
    }

    public static getSeed(): number {
        return RandomUtil.seed;
    }

    private static getR(): number {
        RandomUtil.result = (RandomUtil.result * RandomUtil.a + RandomUtil.b) % ((1 << 31) - 1);
        return RandomUtil.result;
    }

    public static getRandom(min: number, max: number): number {
        return min + this.getR() % (max - min);
    }
}

window["RandomUtil"] = RandomUtil;