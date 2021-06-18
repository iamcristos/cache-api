import model from '../model';
import CacheQuery from './cache.query';

const Query = () => ({
  cache: new CacheQuery(model.Cache),
});

export default Query;
