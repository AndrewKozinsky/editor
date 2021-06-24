import TempCompTypes from 'store/article/codeType/tempCompCodeType'

class ArticleManager {
    getTemplate(tempComps: TempCompTypes.TempComps, tmpCompId: TempCompTypes.UuId): TempCompTypes.TempComp {
        return tempComps.find((template) => {
            return template.uuid === tmpCompId;
        });
    }
}

export default new ArticleManager()