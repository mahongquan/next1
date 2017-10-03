import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
        <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
          <style>{`

.text {
  -ms-flex-order: 2;
      order: 2;
  padding-top: 40px;
  width: 440px;
  font-weight: bold; }

.board {
  -ms-flex-order: 1;
      order: 1;
  width: 440px;
  height: 440px;
  padding: 5px;
  background-color: #baa;
  border-radius: 7px;
  outline: none;
  position: relative; }

.board .cell, .tile {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  cursor: default; }

.cell, .tile {
  width: 100px;
  height: 100px;
  margin: 5px;
  line-height: 90px;
  display: inline-block;
  font-size: 55px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  border-radius: 7px;
  color: #766;
  background-color: #dcb; }

.tile0 {
  background-color: #dcb; }

.tile2 {
  background-color: #eee; }

.tile4 {
  background-color: #eec; }

.tile8 {
  color: #ffe;
  background-color: #fb8; }

.tile16 {
  color: #ffe;
  background-color: #f96; }

.tile32 {
  color: #ffe;
  background-color: #f75; }

.tile64 {
  color: #ffe;
  background-color: #f53; }

.tile128 {
  color: #ffe;
  background-color: #ec7;
  font-size: 45px; }

.tile256 {
  color: #ffe;
  background-color: #ec6;
  font-size: 45px; }

.tile512 {
  color: #ffe;
  background-color: #ec5;
  font-size: 45px; }

.tile1024 {
  color: #fff;
  background-color: #ec3;
  font-size: 35px; }

.tile2048 {
  color: #fff;
  background-color: #ec2;
  font-size: 35px; }

.tile {
  position: absolute; }

.tile.merged {
  display: none; }

.tile.merged.isMoving {
  display: inline; }

.tile.new, .overlay {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: newTile;
          animation-name: newTile;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards;
  -webkit-animation-delay: 0.15s;
          animation-delay: 0.15s;
  -webkit-transform: scale(0);
          transform: scale(0); }

@-webkit-keyframes newTile {
  from {
    -webkit-transform: scale(0);
            transform: scale(0); }

  to {
    -webkit-transform: scale(1);
            transform: scale(1); } }

@keyframes newTile {
  from {
    -webkit-transform: scale(0);
            transform: scale(0); }

  to {
    -webkit-transform: scale(1);
            transform: scale(1); } }

.overlay {
  position: absolute;
  top: 0px;
  bottom: 0px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
      flex-direction: column;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-pack: center;
      justify-content: center;
  text-align: center;
  left: 0px;
  right: 0px;
  font-size: 55px;
  font-weight: bolder;
  background-color: rgba(221, 221, 221, 0.5);
  border-radius: 7px; }

.tryAgain {
  background-color: #876;
  color: #fff;
  height: 40px;
  width: 200px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 5px; }

.overlay .message {
  color: #666; }
.position_0_0:not(.isMoving) {
  top: 5px;
  left: 5px; }

.position_0_1:not(.isMoving) {
  top: 5px;
  left: 115px; }

.position_0_2:not(.isMoving) {
  top: 5px;
  left: 225px; }

.position_0_3:not(.isMoving) {
  top: 5px;
  left: 335px; }

.position_1_0:not(.isMoving) {
  top: 115px;
  left: 5px; }

.position_1_1:not(.isMoving) {
  top: 115px;
  left: 115px; }

.position_1_2:not(.isMoving) {
  top: 115px;
  left: 225px; }

.position_1_3:not(.isMoving) {
  top: 115px;
  left: 335px; }

.position_2_0:not(.isMoving) {
  top: 225px;
  left: 5px; }

.position_2_1:not(.isMoving) {
  top: 225px;
  left: 115px; }

.position_2_2:not(.isMoving) {
  top: 225px;
  left: 225px; }

.position_2_3:not(.isMoving) {
  top: 225px;
  left: 335px; }

.position_3_0:not(.isMoving) {
  top: 335px;
  left: 5px; }

.position_3_1:not(.isMoving) {
  top: 335px;
  left: 115px; }

.position_3_2:not(.isMoving) {
  top: 335px;
  left: 225px; }

.position_3_3:not(.isMoving) {
  top: 335px;
  left: 335px; }

.row_from_0_to_0 {
  top: 5px; }

.row_from_0_to_1 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_0_to_1;
          animation-name: row_from_0_to_1;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_0_to_1 {
  from {
    top: 5px; }

  to {
    top: 115px; } }

@keyframes row_from_0_to_1 {
  from {
    top: 5px; }

  to {
    top: 115px; } }

.row_from_0_to_2 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_0_to_2;
          animation-name: row_from_0_to_2;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_0_to_2 {
  from {
    top: 5px; }

  to {
    top: 225px; } }

@keyframes row_from_0_to_2 {
  from {
    top: 5px; }

  to {
    top: 225px; } }

.row_from_0_to_3 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_0_to_3;
          animation-name: row_from_0_to_3;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_0_to_3 {
  from {
    top: 5px; }

  to {
    top: 335px; } }

@keyframes row_from_0_to_3 {
  from {
    top: 5px; }

  to {
    top: 335px; } }

.row_from_1_to_0 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_1_to_0;
          animation-name: row_from_1_to_0;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_1_to_0 {
  from {
    top: 115px; }

  to {
    top: 5px; } }

@keyframes row_from_1_to_0 {
  from {
    top: 115px }

  to {
    top: 5px } }

.row_from_1_to_1 {
  top: 115px }

.row_from_1_to_2 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_1_to_2;
          animation-name: row_from_1_to_2;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_1_to_2 {
  from {
    top: 115px }

  to {
    top: 225px } }

@keyframes row_from_1_to_2 {
  from {
    top: 115px }

  to {
    top: 225px } }

.row_from_1_to_3 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_1_to_3;
          animation-name: row_from_1_to_3;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_1_to_3 {
  from {
    top: 115px }

  to {
    top: 335px } }

@keyframes row_from_1_to_3 {
  from {
    top: 115px }

  to {
    top: 335px } }

.row_from_2_to_0 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_2_to_0;
          animation-name: row_from_2_to_0;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_2_to_0 {
  from {
    top: 225px }

  to {
    top: 5px } }

@keyframes row_from_2_to_0 {
  from {
    top: 225px }

  to {
    top: 5px } }

.row_from_2_to_1 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_2_to_1;
          animation-name: row_from_2_to_1;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_2_to_1 {
  from {
    top: 225px }

  to {
    top: 115px } }

@keyframes row_from_2_to_1 {
  from {
    top: 225px }

  to {
    top: 115px } }

.row_from_2_to_2 {
  top: 225px }

.row_from_2_to_3 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_2_to_3;
          animation-name: row_from_2_to_3;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_2_to_3 {
  from {
    top: 225px }

  to {
    top: 335px } }

@keyframes row_from_2_to_3 {
  from {
    top: 225px }

  to {
    top: 335px } }

.row_from_3_to_0 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_3_to_0;
          animation-name: row_from_3_to_0;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_3_to_0 {
  from {
    top: 335px }

  to {
    top: 5px } }

@keyframes row_from_3_to_0 {
  from {
    top: 335px }

  to {
    top: 5px } }

.row_from_3_to_1 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_3_to_1;
          animation-name: row_from_3_to_1;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_3_to_1 {
  from {
    top: 335px }

  to {
    top: 115px } }

@keyframes row_from_3_to_1 {
  from {
    top: 335px }

  to {
    top: 115px } }

.row_from_3_to_2 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: row_from_3_to_2;
          animation-name: row_from_3_to_2;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes row_from_3_to_2 {
  from {
    top: 335px }

  to {
    top: 225px } }

@keyframes row_from_3_to_2 {
  from {
    top: 335px }

  to {
    top: 225px } }

.row_from_3_to_3 {
  top: 335px }

.column_from_0_to_0 {
  left: 5px }

.column_from_0_to_1 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_0_to_1;
          animation-name: column_from_0_to_1;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_0_to_1 {
  from {
    left: 5px }

  to {
    left: 115px } }

@keyframes column_from_0_to_1 {
  from {
    left: 5px }

  to {
    left: 115px } }

.column_from_0_to_2 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_0_to_2;
          animation-name: column_from_0_to_2;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_0_to_2 {
  from {
    left: 5px }

  to {
    left: 225px } }

@keyframes column_from_0_to_2 {
  from {
    left: 5px }

  to {
    left: 225px } }

.column_from_0_to_3 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_0_to_3;
          animation-name: column_from_0_to_3;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_0_to_3 {
  from {
    left: 5px }

  to {
    left: 335px } }

@keyframes column_from_0_to_3 {
  from {
    left: 5px }

  to {
    left: 335px } }

.column_from_1_to_0 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_1_to_0;
          animation-name: column_from_1_to_0;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_1_to_0 {
  from {
    left: 115px }

  to {
    left: 5px } }

@keyframes column_from_1_to_0 {
  from {
    left: 115px }

  to {
    left: 5px } }

.column_from_1_to_1 {
  left: 115px }

.column_from_1_to_2 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_1_to_2;
          animation-name: column_from_1_to_2;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_1_to_2 {
  from {
    left: 115px }

  to {
    left: 225px } }

@keyframes column_from_1_to_2 {
  from {
    left: 115px }

  to {
    left: 225px } }

.column_from_1_to_3 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_1_to_3;
          animation-name: column_from_1_to_3;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_1_to_3 {
  from {
    left: 115px }

  to {
    left: 335px } }

@keyframes column_from_1_to_3 {
  from {
    left: 115px }

  to {
    left: 335px } }

.column_from_2_to_0 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_2_to_0;
          animation-name: column_from_2_to_0;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_2_to_0 {
  from {
    left: 225px }

  to {
    left: 5px } }

@keyframes column_from_2_to_0 {
  from {
    left: 225px }

  to {
    left: 5px } }

.column_from_2_to_1 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_2_to_1;
          animation-name: column_from_2_to_1;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_2_to_1 {
  from {
    left: 225px }

  to {
    left: 115px } }

@keyframes column_from_2_to_1 {
  from {
    left: 225px }

  to {
    left: 115px } }

.column_from_2_to_2 {
  left: 225px }

.column_from_2_to_3 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_2_to_3;
          animation-name: column_from_2_to_3;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_2_to_3 {
  from {
    left: 225px }

  to {
    left: 335px } }

@keyframes column_from_2_to_3 {
  from {
    left: 225px }

  to {
    left: 335px } }

.column_from_3_to_0 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_3_to_0;
          animation-name: column_from_3_to_0;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_3_to_0 {
  from {
    left: 335px }

  to {
    left: 5px } }

@keyframes column_from_3_to_0 {
  from {
    left: 335px }

  to {
    left: 5px } }

.column_from_3_to_1 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_3_to_1;
          animation-name: column_from_3_to_1;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_3_to_1 {
  from {
    left: 335px }

  to {
    left: 115px } }

@keyframes column_from_3_to_1 {
  from {
    left: 335px }

  to {
    left: 115px } }

.column_from_3_to_2 {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-name: column_from_3_to_2;
          animation-name: column_from_3_to_2;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards; }

@-webkit-keyframes column_from_3_to_2 {
  from {
    left: 335px }

  to {
    left: 225px } }

@keyframes column_from_3_to_2 {
  from {
    left: 335px }

  to {
    left: 225px } }

.column_from_3_to_3 {
  left: 335px }

          `}</style>
        </Head>
        <body style={
          {
            display: "-ms-flexbox",
            display: "flex",
            msFlexDirection: "column",
            flexDirection: "column",
            msFlexPack: "center",
            justifyContent: "center",
            msFlexLinePack: "center",
            alignContent: "center",
            msFlexAlign: "center",
            alignItems: "center",
            fontFamily: 'Clear Sans, sans-serif',
            fontSize: "21px"
        }
        }>
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}