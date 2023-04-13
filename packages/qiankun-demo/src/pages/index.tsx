// import styles from './index.less';

// export default function IndexPage() {
//   return (
//     <div>
//       <h1 className={styles.title}>Page index</h1>
//     </div>
//   );
// }

import { MicroApp } from 'umi';

export function MyPage() {
  return (
    <div>
      <div>
        <MicroApp
          name="app1"
          // 关闭 loading 动画
          autoSetLoading={false}
        />
      </div>
    </div>
  );
}
