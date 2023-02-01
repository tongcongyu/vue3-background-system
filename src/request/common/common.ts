import { useGet } from '@/utils/http/axios';
import { dealMenu } from '@/utils/menu/dealMenu';

const getAllMenuList = async () => {
  return new Promise((resolve, reject) => {
    useGet('/api/v1/menu/loadAllMenu', {})
      .then((res: any) => {
        if (res.data) {
          const resData = res.data;
          const menuArr = dealMenu(resData);
          resolve({
            allMenuList: menuArr,
          });
        } else {
          reject({});
        }
      })
      .catch((err: any) => {
        reject(new Error(err));
      });
  });
};

export { getAllMenuList };
