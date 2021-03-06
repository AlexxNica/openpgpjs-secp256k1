// OpenPGP.js - An OpenPGP implementation in javascript
// Copyright (C) 2015 Kryptokit
//
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 3.0 of the License, or (at your option) any later version.
//
// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

// Functions to add and remove PKCS5 padding

/**
 * PKCS5 padding
 * @module crypto/pkcs5
 */

function getPkcs5Padding(length) {
  const c = 8 - (length % 8);
  var result = [];
  for (var i = 0; i < c; ++i) {
    result.push(String.fromCharCode(c));
  }
  return result.join("");
}

/**
 * Add pkcs5 padding to a text.
 * @param  {String}  msg  Text to add padding
 * @return {String}       Text with padding added
 */
function addPadding(msg) {
  return msg + getPkcs5Padding(msg.length);
}

/**
 * Remove pkcs5 padding from a string.
 * @param  {String}  msg  Text to remove padding from
 * @return {String}       Text with padding removed
 */
function removePadding(msg) {
  var len = msg.length;
  if (len > 0) {
    var c = msg.charCodeAt(len - 1);
    if (c >= 1 && c <= 8) {
      return msg.substr(0, len - c);
    }
  }
  throw new Error('Invalid padding');
}

module.exports = {
  addPadding: addPadding,
  removePadding: removePadding
};
