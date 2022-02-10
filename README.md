# Exhibition Editor
[벽전](https://github.com/boostcampwm-2021/web14-salondesrefuses) 서비스에 사용 된 전시회 에디터입니다.
벽전 서비스에서는 등록된 artwork를 가져와서 보여준 반면 현 에디터에서는 이미지를 업로드하시고 클릭하시면 됩니다.

간단하게 다시 만든 서비스로,
- width 설정 추가
- font style에서 font-family는 변경 불가
- 저장, 수정으로 페이지에 결과를 보여주거나 변경
등의 차이점이 있습니다.

## 주요 기능
- TEXT, RECTANGULAR, IMAGE를 에디터에 띄울 수 있다
- 띄워진 ELEMENT들은 이동이 가능하고, 사이즈 조절이 가능하다
- TEXT는 double click시 수정모드가 된다.
- 색상 변경 기능이 있어 TEXT의 글씨 색상, RECTANGULAR의 배경 색상을 바꿀 수 있다
- TEXT는 정렬을 왼쪽, 중앙, 오른쪽 바꿀 수 있으며 글씨 크기를 조절할 수 있다
- z-index를 사용하여 겹치는 ELEMENT의 값을 조정해 줄 수 있다
- 모든 ELEMENT는 삭제가 가능하다

## 추가
현재 상태의 에디터에 더 많은 기능과 효율적인 구조로 변경할 계획에 있습니다. 추후 라이브러리로 제작할 생각입니다.
