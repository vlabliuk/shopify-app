// import invariant from "tiny-invariant";
import db from "../db.server";

export async function getComment(id: number, graphql: any) {
  const comment = await db.comment.findFirst({ where: { id } });

  if (!comment) {
    return null;
  }

  //return supplementQRCode(comment, graphql);
  return comment;
}

export async function getQRCodes(shop: any, graphql: any) {
  const comments = await db.comment.findMany({
    where: { shop },
    orderBy: { id: "desc" },
  });

  if (comments.length === 0) return [];

  return comments;
}

// export function getQRCodeImage(id) {
//   const url = new URL(`/qrcodes/${id}/scan`, process.env.SHOPIFY_APP_URL);
//   return qrcode.toDataURL(url.href);
// }

// export function getDestinationUrl(qrCode) {
//   if (qrCode.destination === "product") {
//     return `https://${qrCode.shop}/products/${qrCode.productHandle}`;
//   }

//   const match = /gid:\/\/shopify\/ProductVariant\/([0-9]+)/.exec(qrCode.productVariantId);
//   invariant(match, "Unrecognized product variant ID");

//   return `https://${qrCode.shop}/cart/${match[1]}:1`;
// }

// async function supplementQRCode(qrCode, graphql) {
//   const qrCodeImagePromise = getQRCodeImage(qrCode.id);

//   const response = await graphql(
//     `
//       query supplementQRCode($id: ID!) {
//         product(id: $id) {
//           title
//           images(first: 1) {
//             nodes {
//               altText
//               url
//             }
//           }
//         }
//       }
//     `,
//     {
//       variables: {
//         id: qrCode.productId,
//       },
//     }
//   );

//   const {
//     data: { product },
//   } = await response.json();

//   return {
//     ...qrCode,
//     productDeleted: !product?.title,
//     productTitle: product?.title,
//     productImage: product?.images?.nodes[0]?.url,
//     productAlt: product?.images?.nodes[0]?.altText,
//     destinationUrl: getDestinationUrl(qrCode),
//     image: await qrCodeImagePromise,
//   };
// }

// export function validateQRCode(data) {
//   const errors = {};

//   if (!data.title) {
//     errors.title = "Title is required";
//   }

//   if (!data.productId) {
//     errors.productId = "Product is required";
//   }

//   if (!data.destination) {
//     errors.destination = "Destination is required";
//   }

//   if (Object.keys(errors).length) {
//     return errors;
//   }
// }
