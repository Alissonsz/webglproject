export class GeometryUtils {
    static getReflectVecor(dirVector, normal) {
        normal = GeometryUtils.normalize(normal);
        var dotProduct = GeometryUtils.getDotProduct(dirVector, normal);
        dotProduct = dotProduct * 2;
        normal[0] = normal[0] * dotProduct;
        normal[1] = normal[1] * dotProduct;
        dirVector[0] = dirVector[0] - normal[0];
        dirVector[1] = dirVector[1] - normal[1];
      
        return dirVector;
    }
      
    static getDotProduct(vector1, vector2) {
        var dotProduct = (vector1[0] * vector2[0]) + (vector1[1] * vector2[1]);
        return dotProduct;
    }
    
    static getModule(vector) {
        var vectorModule = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
        return vectorModule;
    }
    
    static normalize(vector) {
        var vectorModule = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
        return [vector[0] / vectorModule, vector[1] / vectorModule];
    }
}