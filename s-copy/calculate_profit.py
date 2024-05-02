import requests
import json

# Test data
transactions = [
    {
      "timestamp": "1714678461",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "51017474",
      "amountOut": "51006614",
      "hash": "0xcb27e54e7b99008cdf92676192ae2f19c1985eabc14f49acac8afb07b3c58ef2",
      "pool": {
        "id": "0xbe3ad6a5669dc0b8b12febc03608860c31e2eef6"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x0421455364debc21846a2e75e438b6251b201b96"
      }
    },
    {
      "timestamp": "1714678460",
      "amountInUSD": "0",
      "amountOutUSD": "6.89753704742784326911105",
      "amountIn": "2446583155891906333",
      "amountOut": "2310505336316755",
      "hash": "0xe295528dee5cceb9b414aabf948bd26f9f571011d6bba05a013470bc403edd5b",
      "pool": {
        "id": "0x94459b5d5b85b00a780c5f577fda46fc2e13015f"
      },
      "tokenIn": {
        "symbol": "BVM"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x51f678a2c213e058674c812943276d8d69b0f2f3"
      }
    },
    {
      "timestamp": "1714678460",
      "amountInUSD": "1702.4703",
      "amountOutUSD": "1701.50511611355448320605535",
      "amountIn": "1702470300",
      "amountOut": "569962382734379085",
      "hash": "0xbddc08adf1ef525917bd4867b843c6a01d2c9b03ed44bc1c96f0f560f5371b6a",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xf76d1cacd26fd5e99de45b8f3207d3ac509dc0b6"
      }
    },
    {
      "timestamp": "1714678460",
      "amountInUSD": "589.5347633222874344395580156711906",
      "amountOutUSD": "591.91448570347680348703403",
      "amountIn": "24000000000000000000",
      "amountOut": "198276800611178993",
      "hash": "0xbbbf7ba8698204d6e452c50b54f8da84f960bcc55e4b4efdb873662400f682be",
      "pool": {
        "id": "0x1aeedd3727a6431b8f070c0afaa81cc74f273882"
      },
      "tokenIn": {
        "symbol": "GMX"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xabb88be6b5dd46e3c8acc3973dd156e625abc029"
      }
    },
    {
      "timestamp": "1714678460",
      "amountInUSD": "3286.862209",
      "amountOutUSD": "3285.18436821341847735712589",
      "amountIn": "3286862209",
      "amountOut": "1100455997749520759",
      "hash": "0x82cb45fe1c2754bd0fa69a289dab94365f52a48db33b3bc195a42b656ea531c3",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x5096fb354daca9b11ce0d5884fad532b056e05dd"
      }
    },
    {
      "timestamp": "1714678459",
      "amountInUSD": "582.752563",
      "amountOutUSD": "582.6679339703160009330119309081908",
      "amountIn": "582752563",
      "amountOut": "567313637775031834702",
      "hash": "0x4d73bd9e23797dcf6a2d4f5ce549cac4fbf04c5ebf71494a8864b88ce17e2d11",
      "pool": {
        "id": "0xcda53b1f66614552f834ceef361a8d12a0b8dad8"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "ARB"
      },
      "account": {
        "id": "0xe31e43f02b34562844e386026068f2aabb42f91a"
      }
    },
    {
      "timestamp": "1714678459",
      "amountInUSD": "12.4149701189399067106795020627243",
      "amountOutUSD": "12.37769732631129462671277",
      "amountIn": "49500000000000000000",
      "amountOut": "4146224301096087",
      "hash": "0x18e039fbf47f36be58715674c4b4eb787f468a7a5471e1b50e08fe98e6c3b487",
      "pool": {
        "id": "0x74d0ae8b8e1fca6039707564704a25ad2ee036b0"
      },
      "tokenIn": {
        "symbol": "GRT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xd49633de45a20dca1df2c69f2d39ddf864daf635"
      }
    },
    {
      "timestamp": "1714678458",
      "amountInUSD": "3.03056316148338555220485",
      "amountOutUSD": "3.02903",
      "amountIn": "2869443887216196139",
      "amountOut": "3029030",
      "hash": "0x5862617486f7412af66348b35582e895f30e0b822820ccb1bdb2c828c1a6e5ce",
      "pool": {
        "id": "0xe4d9faddd9bca5d8393bee915dc56e916ab94d27"
      },
      "tokenIn": {
        "symbol": "agEUR"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x47f7e1bb586f4ec051e1d8236e3868e55e5e3b5c"
      }
    },
    {
      "timestamp": "1714678458",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "65536000",
      "amountOut": "21952007256170474",
      "hash": "0x4c4254b6f6948d4f08ddfc0295e8010fe34b19ebf4238dc7c85f3301d6c98d26",
      "pool": {
        "id": "0x6f38e884725a116c9c7fbf208e79fe8828a2595f"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xb00508c93e686441049ff28cdb4d1dd843114e33"
      }
    },
    {
      "timestamp": "1714678458",
      "amountInUSD": "200.681083",
      "amountOutUSD": "0",
      "amountIn": "200681083",
      "amountOut": "14625860000000000000000",
      "hash": "0x110e306a4944c5159f187199d6902b5df4b79a925456576aab87592efca3374d",
      "pool": {
        "id": "0x9e0be08caa5387634ed3bf8e017274499462aa3e"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "STYLE"
      },
      "account": {
        "id": "0xe5ada4ffebdffe51c44389d79d61739d11a0b858"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "2808734454",
      "amountOut": "940490624310503033",
      "hash": "0xfa9b92c299ddeb501095b1b568ca5c6b2b46dfcb17d96bc6f92572214dba879f",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x6d5880ab9d57a6bf703989383365e05a87120292"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "301",
      "amountOutUSD": "300.8844255625853023131601898442249",
      "amountIn": "301000000",
      "amountOut": "293044480202622569120",
      "hash": "0xd93135c03a77f5541ff44fddc9d07e4db3f5d32b0433271fdbc6a6007d6b5503",
      "pool": {
        "id": "0xcda53b1f66614552f834ceef361a8d12a0b8dad8"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "ARB"
      },
      "account": {
        "id": "0x3c1cd7578c266179caa1a9144b6832a2bdfb2db1"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "1862.27019",
      "amountOutUSD": "1861.42808806011125002554732",
      "amountIn": "1862270190",
      "amountOut": "623532646662130692",
      "hash": "0xd5b23edfeea6137975b0c8cd77264d19d1ef7ee5ec63a0d37a5a44fa0dfedf05",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x5096fb354daca9b11ce0d5884fad532b056e05dd"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "7968.528203023452366573046657389289",
      "amountOutUSD": "7963.97568010434440987606785",
      "amountIn": "7760897563470687395010",
      "amountOut": "2669120862235230055",
      "hash": "0xd1d59badb5841b0b90da3c4421b8be9a9ed7a68f77bd60c5cf44f3d1b60610ee",
      "pool": {
        "id": "0xc6f780497a95e246eb9449f5e4770916dcd6396a"
      },
      "tokenIn": {
        "symbol": "ARB"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x02e76ca155ef710ddf846bd8c8192a7d2e91d9cf"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "5973.177671",
      "amountOutUSD": "5967.48974",
      "amountIn": "5973177671",
      "amountOut": "2000000000000000000",
      "hash": "0xc61a1c28a36551dd97cfde96b45287c8a49c8c3be8a39cbec18ef0d793e6864f",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x940a7ed683a60220de573ab702ec8f789ef0a402"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "3177.1314",
      "amountOutUSD": "3174.26946191030104937833149",
      "amountIn": "3177131400",
      "amountOut": "1063854183320406027",
      "hash": "0xbbc3178756534c6ef5d94ad3c3b6d0de3f86944a44ccbfc08b46ff173539988c",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x318ddba67d86f524d6b41be768949de71dec6532"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "573.1",
      "amountOutUSD": "572.55943752592415732425376",
      "amountIn": "573100000",
      "amountOut": "191892893820350048",
      "hash": "0xba4f6cf2093118f850c959e1e3a316515694e8e4c9307a09f0d83a61a9dd5ca7",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x85f448254e02d51210d72a10aa35d3a5378d4eae"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "966.23306",
      "amountOutUSD": "965.9938643222769773077756077544665",
      "amountIn": "966233060",
      "amountOut": "940823604677945146922",
      "hash": "0xa2d785d089d891c7c5592ecb1fca3b25fa4c1432c196b61c301a585cadb51361",
      "pool": {
        "id": "0xcda53b1f66614552f834ceef361a8d12a0b8dad8"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "ARB"
      },
      "account": {
        "id": "0x4ffb2ce97adccf2bcd7a2babbfe24370bf264aa0"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "14934113743",
      "amountOut": "5000000000000000000",
      "hash": "0x9d531e91446944789ccd1dfdc5d9f3d3ed7299be82f7eeed041d98603167f802",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x090ee598777caddad04df4271b167f38e73a9bf0"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "2338.616427",
      "amountOutUSD": "2336.97866463839439430254877",
      "amountIn": "2338616427",
      "amountOut": "783236759997644971",
      "hash": "0x9bea9eb5756c39466e5bebcd2e8ccad4447f0557ef1cd4e49215c31d8614cafa",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x876a6aa56860946bebb3fbfd81878c52004e73a3"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "4374.408456",
      "amountOutUSD": "4370.84181413902185034055549",
      "amountIn": "4374408456",
      "amountOut": "1464884567740881227",
      "hash": "0x7808c12119dc1c04702e8163fca746a82996cb0715b57974dbdf4772fa2e90f2",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x0f25890c7f5cc6d29598ca6922293761c7f4afa3"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "3577878104",
      "amountOut": "1197996839996774819",
      "hash": "0x77f14f2f110a29be278dbf1ec407267e93d43786dcab21a72e2c34711474cad1",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x489cb66325e23aea87f8fef927ff0f02147933ee"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "216979327",
      "amountOut": "367170",
      "hash": "0x6851af5933de5ea1dce53a914a0609754c6b5467f87faf54440b3badc40fd5fa",
      "pool": {
        "id": "0x0e4831319a50228b9e450861297ab92dee15b44f"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WBTC"
      },
      "account": {
        "id": "0x879c2a2f7e4071ebdc971e508885d4a8cdeaf227"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "2304500000",
      "amountOut": "771669677748595117",
      "hash": "0x5a898a9a2b5458d4953c20cf4f01e7aabd8ae78fe2de1cbb0e84b36475124b51",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x9e95563a108f4cf39dbee37dc52c8a684de364c1"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "2468.226891",
      "amountOutUSD": "2466.1078921189871",
      "amountIn": "2468226891",
      "amountOut": "826514330000000000",
      "hash": "0x4f46ac5ec069fa0f4a0d66bb2f5dd2e7cdb03dafe74995919f30f69341424b7e",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x876a6aa56860946bebb3fbfd81878c52004e73a3"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "2350.452395",
      "amountOutUSD": "2348.68392559664981234306828",
      "amountIn": "2350452395",
      "amountOut": "787159769996236244",
      "hash": "0x4e0efc2780b77b0e02d549384d67735d5d13ef88a32814044c51074d866f1065",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xe72ea9cdbfc10539d83136708c970adf737b0433"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "3004056840",
      "amountOut": "1005944962504707589",
      "hash": "0x49eaedc0da446c25a92654ed58ad2cd8aa37748d5c2a58fd220ac8046f9d9ef9",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xe301e78ad0fb4ba97ee97f6b6fec1af48fd4d2ff"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "2368.063361",
      "amountOutUSD": "2366.1575411777148",
      "amountIn": "2368063361",
      "amountOut": "793016040000000000",
      "hash": "0x486fd43d2419d12e064bf91acbc6317412876cc0181e2a07076048f825008049",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x95c3ba35a943c28c811954369a7b9ccc328ddd46"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "2567800000",
      "amountOut": "859882645429676260",
      "hash": "0x39383d1e273b6169eb3c096fa76facaf833f0bba108095c35bb6bfd007dca439",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xe59b0f89a965ad2e174ad7884ecbcea58a0c5319"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "498441301",
      "amountOut": "485228929881625103141",
      "hash": "0x299f852dd2400e3d085517ef0986a58171a71bb3d0aa6c00322e0f0d0ecd5504",
      "pool": {
        "id": "0xb0f6ca40411360c03d41c5ffc5f179b8403cdcf8"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "ARB"
      },
      "account": {
        "id": "0x934150d353f5e53cb6e9178456067b545a443a5d"
      }
    },
    {
      "timestamp": "1714678457",
      "amountInUSD": "301",
      "amountOutUSD": "300.8976484622593712989223955099913",
      "amountIn": "301000000",
      "amountOut": "293057358561994323898",
      "hash": "0x0dd6cefc9083f96fb7415003e57aad4b62de2c202d3136a99683639ee8095e33",
      "pool": {
        "id": "0xcda53b1f66614552f834ceef361a8d12a0b8dad8"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "ARB"
      },
      "account": {
        "id": "0x2b66fafb3a68c698cf9d3f21aa7d09651bb14b22"
      }
    },
    {
      "timestamp": "1714678456",
      "amountInUSD": "1400.40586",
      "amountOutUSD": "1399.35556935833665114970454",
      "amountIn": "1400405860",
      "amountOut": "468993037383366042",
      "hash": "0x893c3aeaf6124899aba2065451822e50424b6bfcd38797144d5dac0e14d1372e",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xea844d1b56450d7e0c3d76bfd6f212e23f2bbe0d"
      }
    },
    {
      "timestamp": "1714678456",
      "amountInUSD": "1124.847888",
      "amountOutUSD": "1124.03641128427310913012235",
      "amountIn": "1124847888",
      "amountOut": "376720014698935405",
      "hash": "0x8774b77153e5ea07336076df590cd887cc1581a5e1d6552787196e99fbe18847",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xe71bc05b7a23b2792ad9056967e27bb389f25643"
      }
    },
    {
      "timestamp": "1714678456",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "633083071",
      "amountOut": "212004722046146949",
      "hash": "0x807de2a4e9f62c4e17c23794f602ee03daa6634644e7185fc2a0a37223362562",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x489cb66325e23aea87f8fef927ff0f02147933ee"
      }
    },
    {
      "timestamp": "1714678456",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "5781250000",
      "amountOut": "1936121454156668945",
      "hash": "0x77941113b5d061c890292ad19519c525f73da8aca7f5d5d5c2b61517539c897f",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x6c8a60974aa58dc47f37c8046d69fe97598ecea5"
      }
    },
    {
      "timestamp": "1714678456",
      "amountInUSD": "3125",
      "amountOutUSD": "3123.15924176936099247543081",
      "amountIn": "3125000000",
      "amountOut": "1046724628895419263",
      "hash": "0x6679edf9c943a374e2d2a28e2302b333a654c16f95b704cafbbe3e4e9fc3460f",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x9394f7ec2f704e7a0fac2e877ee5dc16e3276c30"
      }
    },
    {
      "timestamp": "1714678456",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "729989527",
      "amountOut": "244478910000000000",
      "hash": "0x61d8d17da3d4de880c95b4203b5cf7fbc7f0390ced4cb0fbea24537e139d39af",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x6d5880ab9d57a6bf703989383365e05a87120292"
      }
    },
    {
      "timestamp": "1714678456",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "27980775991084761",
      "amountOut": "83464000",
      "hash": "0x5dc5f311ead4bda99595b3ea2255bc813b28c51c13639132cd6a7dacd34c143e",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "WETH"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x447c9e8836db79d7ab65ee1b2c4ef6693bfeb497"
      }
    },
    {
      "timestamp": "1714678456",
      "amountInUSD": "1167.2",
      "amountOutUSD": "1166.45678810340536173284734",
      "amountIn": "1167200000",
      "amountOut": "390937174230786482",
      "hash": "0x555d5a79c992610fee8a063220e00de0f24b64d21ac521a9b1cbc479fac7c0b8",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x5a100f5ef595ae6681247feaf7fa4ffd3f0bd8e3"
      }
    },
    {
      "timestamp": "1714678456",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "2875000000",
      "amountOut": "962786927949436520",
      "hash": "0x3805690914137e440be7a8cad32b0c78f968992054a0da24b380c0c837013b99",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xb5c3b8c5ffe99bbbef28f935145a96f6ccbc8492"
      }
    },
    {
      "timestamp": "1714678456",
      "amountInUSD": "1108.219728",
      "amountOutUSD": "1107.48605907532252067693335",
      "amountIn": "1108219728",
      "amountOut": "371173175766640705",
      "hash": "0x28b5a10d627c22baa30423711bbca82022105c3313da26b873760bb713446b1b",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x95c3ba35a943c28c811954369a7b9ccc328ddd46"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "710.385003",
      "amountOutUSD": "710.3493359471044800933458081539168",
      "amountIn": "710385003",
      "amountOut": "691840235750581636503",
      "hash": "0xf507a42487f83d8f7de5330ed1fcc94fc24a68b8995b1c25a9c0e8028657b3d2",
      "pool": {
        "id": "0xcda53b1f66614552f834ceef361a8d12a0b8dad8"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "ARB"
      },
      "account": {
        "id": "0x0a7832d7ec2a01b5b70fb9c84868202f8ea732d4"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "895400000",
      "amountOut": "299888199493086367",
      "hash": "0xeacb6ecd2ad12f17465a76c03a1a21efad4665971053888fc47969866406a497",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x6c4b61c2f73ad49c5df49bd9e37f2766934b467a"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "1215.641456",
      "amountOutUSD": "1214.8352147956233677848346",
      "amountIn": "1215641456",
      "amountOut": "407151169997863580",
      "hash": "0xe0e51545e3f9fcbf3faabac3ef09ede5826fffb31760b3651d4bdb9816ae448b",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xa5467e94ae65ff055648b8f54a065c452afca33b"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "3480053321",
      "amountOut": "1165574179998233301",
      "hash": "0x9ab6f1d4329c47d8be71a4cee4823a3811b3e8167c9aabb408b28707db924ddc",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x36fd943945a59e5e24a47757232180585cbf2059"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "844700000",
      "amountOut": "282905270635322997",
      "hash": "0x89c6b499666b4f43c5dcbc860d065bec0bdaacf2a6574f9b7c029ec16eec76f1",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x3b96fa49082d52a1e0f691c8f7af52c65c075af3"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "1400.25109",
      "amountOutUSD": "1399.2809527289476462192939",
      "amountIn": "1400251090",
      "amountOut": "468968029672371970",
      "hash": "0x7c15c805cd9a63cfc2bdeb4db57f1fa2a43243197775679bc582c0ca94c20c88",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x02b44d2d429aff8227846eff67fea20b720c8645"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "2262.043282",
      "amountOutUSD": "2260.85446392734388592115898",
      "amountIn": "2262043282",
      "amountOut": "757723787532592854",
      "hash": "0x731672eb55b721b11022cd65d81d52c5f2fbb1ee5fc909d0a45644b500f4c837",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x8cc02c2381b7c55e18dccfea917f0677a5671931"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "540200000",
      "amountOut": "180925571849286826",
      "hash": "0x6703a165e726b710338087f087547ee5631638af913c54e0085f9dffba980da2",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x61871f5dc015d82cd276d7e2dfbd3750622163a9"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "133.809038",
      "amountOutUSD": "133.73509259923317444637589",
      "amountIn": "133809038",
      "amountOut": "44821222465724147",
      "hash": "0x4c2e5ce74cc9f845f048ea8a2592bf67111b5a3c5a1e0c5bb943abd70de9b674",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xe72ea9cdbfc10539d83136708c970adf737b0433"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "578146606254021",
      "amountOut": "1724557",
      "hash": "0x4c139d1a9ba7f272261535993a5aafce87a527b3f5bc51ef30c8ec5e483c81b5",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "WETH"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x447c9e8836db79d7ab65ee1b2c4ef6693bfeb497"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "2287.691915",
      "amountOutUSD": "2286.26538527544012177052934",
      "amountIn": "2287691915",
      "amountOut": "766240239995935082",
      "hash": "0x378626f8eea551de7593cd0c5efb23a95c6378b8ea212dd7fcea2250edb47ab8",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x876a6aa56860946bebb3fbfd81878c52004e73a3"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "2502024980",
      "amountOut": "837959421458140890",
      "hash": "0x210af1aecf9ede9f46ef302445ee64ced91ba3e5d7f31341aa4b1347ae091c44",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xc9fb09a5b43c5c7f37645b6e74c2be08d52300a2"
      }
    },
    {
      "timestamp": "1714678455",
      "amountInUSD": "513.448369",
      "amountOutUSD": "513.3767156346741017209904690150695",
      "amountIn": "513448369",
      "amountOut": "500000000000000000000",
      "hash": "0x050531d0a3c4af679fc7809d0b62eeca089d34ffdac637a80bddbf6adaada190",
      "pool": {
        "id": "0xcda53b1f66614552f834ceef361a8d12a0b8dad8"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "ARB"
      },
      "account": {
        "id": "0x3437a388b127f564e15915e3d2b1e1ac14375479"
      }
    },
    {
      "timestamp": "1714678454",
      "amountInUSD": "0.18673331547072618832703",
      "amountOutUSD": "0.186658",
      "amountIn": "62583539681369",
      "amountOut": "186658",
      "hash": "0x5fd9f8e1095f983b1e940b64dcbfd7a69aea12d800dab070f2877a2f3b6dddb5",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "WETH"
      },
      "tokenOut": {
        "symbol": "USDT"
      },
      "account": {
        "id": "0x447c9e8836db79d7ab65ee1b2c4ef6693bfeb497"
      }
    },
    {
      "timestamp": "1714678453",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "52083881176",
      "amountOut": "155",
      "hash": "0x1dbd490d8ac399f8073862eb0817f5636ff3b3b9b392fc5841f0e75846789745",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "WETH"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x0e863c411acb0d87858de6352c040e6d375253cb"
      }
    },
    {
      "timestamp": "1714678453",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "1572500",
      "amountOut": "526803683333846",
      "hash": "0x1dbd490d8ac399f8073862eb0817f5636ff3b3b9b392fc5841f0e75846789745",
      "pool": {
        "id": "0x6f38e884725a116c9c7fbf208e79fe8828a2595f"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x0e863c411acb0d87858de6352c040e6d375253cb"
      }
    },
    {
      "timestamp": "1714678451",
      "amountInUSD": "0",
      "amountOutUSD": "167.09875830494819902075446",
      "amountIn": "50832207875168106143",
      "amountOut": "56003031621449658",
      "hash": "0x79af8dfe66f95cce7f9ab30da4a49dd3226c48b1a2bf2ee62c85fb84faf11872",
      "pool": {
        "id": "0xff33c0e8fe0957a8ea7f79a1a581cb9c6fb82f8a"
      },
      "tokenIn": {
        "symbol": "GNS"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x501433438c11960007f4bbfb80bb440d3f748c03"
      }
    },
    {
      "timestamp": "1714678451",
      "amountInUSD": "167.084316789171608456121288794461",
      "amountOutUSD": "0",
      "amountIn": "37378049443146088448",
      "amountOut": "50832207875168106143",
      "hash": "0x79af8dfe66f95cce7f9ab30da4a49dd3226c48b1a2bf2ee62c85fb84faf11872",
      "pool": {
        "id": "0x0b6529560d2501c208fe7211584f832e4ec74140"
      },
      "tokenIn": {
        "symbol": "PENDLE"
      },
      "tokenOut": {
        "symbol": "GNS"
      },
      "account": {
        "id": "0x501433438c11960007f4bbfb80bb440d3f748c03"
      }
    },
    {
      "timestamp": "1714678450",
      "amountInUSD": "0.074012",
      "amountOutUSD": "0.0739667710261351046955",
      "amountIn": "74012",
      "amountOut": "24789911419650",
      "hash": "0x95b99d0f43a49e50a351d55148ed10b27e46d260603fb3eb4a83f6242a67711a",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x962a43207ed18789272e105987d102729433b9b4"
      }
    },
    {
      "timestamp": "1714678450",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "49739",
      "amountOut": "49817",
      "hash": "0x9098cdc52977a11178d596af51c24ce2db7ab78a1a1625d77ff7f3167ee86589",
      "pool": {
        "id": "0xe08829410408d6dfe3de446fd9596b11d2200294"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x347f5f8553d68c09c305d537e4268936965a8f6e"
      }
    },
    {
      "timestamp": "1714678450",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "49750",
      "amountOut": "49739",
      "hash": "0x9098cdc52977a11178d596af51c24ce2db7ab78a1a1625d77ff7f3167ee86589",
      "pool": {
        "id": "0xbe3ad6a5669dc0b8b12febc03608860c31e2eef6"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x347f5f8553d68c09c305d537e4268936965a8f6e"
      }
    },
    {
      "timestamp": "1714678450",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "15784140579029711",
      "amountOut": "47078774",
      "hash": "0x8c65aeb3c161e6b5c732022f78a5e60b14e1674b91d194053e5006beb20621b8",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "WETH"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x40725d97f5352dfbf749de29ed328ac6189e51a9"
      }
    },
    {
      "timestamp": "1714678449",
      "amountInUSD": "149.1872435",
      "amountOutUSD": "0",
      "amountIn": "50000000000000000",
      "amountOut": "50737181443502863",
      "hash": "0x54c750dfc1622b112c09517172b92f204ed8cf7dfbe2cc2adfece3e104e89c6d",
      "pool": {
        "id": "0x40cc6f68400958bf7225e8a762d3ad41c1064086"
      },
      "tokenIn": {
        "symbol": "WETH"
      },
      "tokenOut": {
        "symbol": "ezETH"
      },
      "account": {
        "id": "0x08183410b690641d4160688661e8a00183fea1d6"
      }
    },
    {
      "timestamp": "1714678448",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "299",
      "amountOut": "99860728939",
      "hash": "0xb72e2ce2fd13149c1f77e0253fa4ec3ae62d362496c9daa9bb9fcb7341aa5714",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xc661246d7da2d20c97c51edc6b2c6ebb1a1f4129"
      }
    },
    {
      "timestamp": "1714678448",
      "amountInUSD": "197.52261557292347244728285",
      "amountOutUSD": "0",
      "amountIn": "66199566041624555",
      "amountOut": "6102468080567100514816",
      "hash": "0x70f666e511746bb604410e4d06b54e531e4ce6ff3807568e44681334c1cb0dbe",
      "pool": {
        "id": "0xc64d26977e4981911239903715bea47bf44377a5"
      },
      "tokenIn": {
        "symbol": "WETH"
      },
      "tokenOut": {
        "symbol": "HIP"
      },
      "account": {
        "id": "0x2d02415f7ae62602155fa7972ce45ebc11e5870c"
      }
    },
    {
      "timestamp": "1714678448",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "20000000000000",
      "amountOut": "59653",
      "hash": "0x41c710cf7916a3ba5d9e54641a9f650d4c2ac5b75398b887603489f09fdb634c",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "WETH"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x340fa0f541d8ed0ef8fd73cb727ab0ae7a3c610a"
      }
    },
    {
      "timestamp": "1714678445",
      "amountInUSD": "102.8127291424521428100414",
      "amountOutUSD": "102.726746",
      "amountIn": "23000000000000000000",
      "amountOut": "102726746",
      "hash": "0x51c1eb8b53c4a6749a16d56ef52fea62eefa6069a36c1850787f0205947e58a3",
      "pool": {
        "id": "0x50e7b9293aef80c304234e86c84a01be8401c530"
      },
      "tokenIn": {
        "symbol": "PENDLE"
      },
      "tokenOut": {
        "symbol": "USDT"
      },
      "account": {
        "id": "0xd27a20fc6f310bb4775f885d8907acfd127d21d8"
      }
    },
    {
      "timestamp": "1714678445",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "10472",
      "amountOut": "3507189222898",
      "hash": "0x4bdd5d7f0f819cf637bce36872e191d2de1a81d5b311467f4bfa8f45fb7353e4",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x115140e040f5e44e502e93e2371f29def3a38e45"
      }
    },
    {
      "timestamp": "1714678444",
      "amountInUSD": "0.264024",
      "amountOutUSD": "0.26389099915370686816932",
      "amountIn": "264024",
      "amountOut": "88442883535862",
      "hash": "0x9ded346f130f358aa426a1415fd0ee2ad65ec9adc10f9cc3573d9773a515440f",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x354e626b568a15abb5729bceafedd8711d7bf2ae"
      }
    },
    {
      "timestamp": "1714678444",
      "amountInUSD": "0",
      "amountOutUSD": "8.16427974254915708443182",
      "amountIn": "3724752770457812567164",
      "amountOut": "2736252637415237",
      "hash": "0x3a74c9afc54a3bd5b24aaf9819f982e056e92623b4ebc6d095c6ed575dd58ce9",
      "pool": {
        "id": "0x866cca5c9220d6c1feea4a54f104cf5236e4375c"
      },
      "tokenIn": {
        "symbol": "KNOW"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xdb41a02d8ed34740a03299d746608fa769f055fb"
      }
    },
    {
      "timestamp": "1714678441",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "65114818398843699604557",
      "amountOut": "6085173",
      "hash": "0xb735049669b3ed338ee8355e96e35773580d482089d21e5a5be6efa2990f112e",
      "pool": {
        "id": "0xe331be1eb677e3b3b047274757f992369d9c319e"
      },
      "tokenIn": {
        "symbol": "TOOB"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0xf29b18cb786a045178c8ee9131e0ff69567bdd2b"
      }
    },
    {
      "timestamp": "1714678441",
      "amountInUSD": "6.075386954254826392772187803012917",
      "amountOutUSD": "0",
      "amountIn": "5917084656932290393",
      "amountOut": "65114818398843699604557",
      "hash": "0xb735049669b3ed338ee8355e96e35773580d482089d21e5a5be6efa2990f112e",
      "pool": {
        "id": "0xf05a084075072b4cf113d97fc793d8f403f98269"
      },
      "tokenIn": {
        "symbol": "ARB"
      },
      "tokenOut": {
        "symbol": "TOOB"
      },
      "account": {
        "id": "0xf29b18cb786a045178c8ee9131e0ff69567bdd2b"
      }
    },
    {
      "timestamp": "1714678441",
      "amountInUSD": "53.02206419398844270399438625414477",
      "amountOutUSD": "53.04727832437212852790914",
      "amountIn": "11861444578847414954",
      "amountOut": "17778758175848899",
      "hash": "0x98a8dc54624ebf7771cbc4a639b7b8838bc4628a2c5feb9c899d03ef0f7edbeb",
      "pool": {
        "id": "0xb08a8794a5d3ccca3725d92964696858d3201909"
      },
      "tokenIn": {
        "symbol": "PENDLE"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x3034d049959675f6448a4b20aa3639ca6a34c4ce"
      }
    },
    {
      "timestamp": "1714678439",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "151507005169597775872",
      "amountOut": "1486577",
      "hash": "0xcfe584e0daf88d90082a011e34cacf002ca781ab4cf00c426d030d88e56ac91b",
      "pool": {
        "id": "0x228c537858e4783801f02fb6909afd6ac7542a90"
      },
      "tokenIn": {
        "symbol": "USH"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x41a4a9d07ce620b45796c116cfe0582b1f99acb0"
      }
    },
    {
      "timestamp": "1714678439",
      "amountInUSD": "12.40858468018658791745101207839924",
      "amountOutUSD": "12.37133105815225259604315",
      "amountIn": "49500000000000000000",
      "amountOut": "4146242980889305",
      "hash": "0x985e89dfe73085037ac667d5914539335b4f3d6f4dbcd9c36da04448fbedc6ee",
      "pool": {
        "id": "0x74d0ae8b8e1fca6039707564704a25ad2ee036b0"
      },
      "tokenIn": {
        "symbol": "GRT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x621f887f7d35c34e814d50b5bd4ec439fc1153aa"
      }
    },
    {
      "timestamp": "1714678439",
      "amountInUSD": "0.330031",
      "amountOutUSD": "0.32986499783981558287242",
      "amountIn": "330031",
      "amountOut": "110554024098574",
      "hash": "0x386cf4ade8db1f3eb000237932934e25fcb63966781a440be7c43282c6eeb251",
      "pool": {
        "id": "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x354e626b568a15abb5729bceafedd8711d7bf2ae"
      }
    },
    {
      "timestamp": "1714678438",
      "amountInUSD": "1.180886",
      "amountOutUSD": "1.18017965878566843601677",
      "amountIn": "1180886",
      "amountOut": "395536390015519",
      "hash": "0xf535dd2260b4009cecc8aaff19d5f5e90832a6e2688f43277ea5e87403532752",
      "pool": {
        "id": "0x641c00a822e8b671738d32a431a4fb6074e5c79d"
      },
      "tokenIn": {
        "symbol": "USDT"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x3f1c702aba842350a397a4d2794945e4035c7e33"
      }
    },
    {
      "timestamp": "1714678438",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "9379776",
      "amountOut": "5538061200",
      "hash": "0xf1c15ba3ae5f0c9efcb8e42f83051311b02c0ee66fcd6b94b28f017a2ba2d897",
      "pool": {
        "id": "0x0e4831319a50228b9e450861297ab92dee15b44f"
      },
      "tokenIn": {
        "symbol": "WBTC"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x0f1afb6c9a50680f22a2989b973da1be835aee17"
      }
    },
    {
      "timestamp": "1714678438",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "223328",
      "amountOut": "131870005",
      "hash": "0xf1c15ba3ae5f0c9efcb8e42f83051311b02c0ee66fcd6b94b28f017a2ba2d897",
      "pool": {
        "id": "0x6985cb98ce393fce8d6272127f39013f61e36166"
      },
      "tokenIn": {
        "symbol": "WBTC"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x0f1afb6c9a50680f22a2989b973da1be835aee17"
      }
    },
    {
      "timestamp": "1714678438",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "172664742",
      "amountOut": "292184",
      "hash": "0x542938cd5fbef35282253d619815d80c59a38df2b2377ef1c77521912c519b32",
      "pool": {
        "id": "0x0e4831319a50228b9e450861297ab92dee15b44f"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WBTC"
      },
      "account": {
        "id": "0x879c2a2f7e4071ebdc971e508885d4a8cdeaf227"
      }
    },
    {
      "timestamp": "1714678437",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "3538",
      "amountOut": "1184924621935",
      "hash": "0xca7f770a856aa5c4133092f0fa5f2ba4e1b0df899483427618ee500034dbe6cd",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x037acd83f3a2cf996022fd84929b48830aa9e969"
      }
    },
    {
      "timestamp": "1714678437",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "463170",
      "amountOut": "155166730425297",
      "hash": "0xaeaaaf0b63284026e291bbb159e7cb37c51698e949a560e8034ca168f0c50267",
      "pool": {
        "id": "0x6f38e884725a116c9c7fbf208e79fe8828a2595f"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xe743a49f04f2f77eb2d3b753ae3ad599de8cea84"
      }
    },
    {
      "timestamp": "1714678437",
      "amountInUSD": "0.4631771839747007058475",
      "amountOutUSD": "0.46313",
      "amountIn": "463250",
      "amountOut": "463130",
      "hash": "0xaeaaaf0b63284026e291bbb159e7cb37c51698e949a560e8034ca168f0c50267",
      "pool": {
        "id": "0xaeeceec4b31d3c1057210115bf176ebb05b9805d"
      },
      "tokenIn": {
        "symbol": "axlUSDC"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0xe743a49f04f2f77eb2d3b753ae3ad599de8cea84"
      }
    },
    {
      "timestamp": "1714678434",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "6445944935",
      "amountOut": "6446032767",
      "hash": "0xa73c97db8e9ff3e02ee1b0e81cebb5393d9cb46c2a72f6fe62d463ffd2dcea6e",
      "pool": {
        "id": "0xbe3ad6a5669dc0b8b12febc03608860c31e2eef6"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "USDT"
      },
      "account": {
        "id": "0xd5797e7cca5c9f1584586e636acbd606675bfa6e"
      }
    },
    {
      "timestamp": "1714678434",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "125767972615",
      "amountOut": "375",
      "hash": "0x2eab558ca1623311b2edd257a26f2bdacd59de14daf57fd9f291b4c1bd83e37e",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "WETH"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0xee238823544f6bd662394cc91be2689da37a6644"
      }
    },
    {
      "timestamp": "1714678434",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "4250507",
      "amountOut": "1423969078476044",
      "hash": "0x2eab558ca1623311b2edd257a26f2bdacd59de14daf57fd9f291b4c1bd83e37e",
      "pool": {
        "id": "0x6f38e884725a116c9c7fbf208e79fe8828a2595f"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xee238823544f6bd662394cc91be2689da37a6644"
      }
    },
    {
      "timestamp": "1714678433",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "48682",
      "amountOut": "48682",
      "hash": "0x773795da9ea12af97574401bedefb7c2a5b0fcc4200d40f85e4dd4f5d7107d11",
      "pool": {
        "id": "0xbe3ad6a5669dc0b8b12febc03608860c31e2eef6"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "USDT"
      },
      "account": {
        "id": "0x347f5f8553d68c09c305d537e4268936965a8f6e"
      }
    },
    {
      "timestamp": "1714678433",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "49750",
      "amountOut": "48682",
      "hash": "0x773795da9ea12af97574401bedefb7c2a5b0fcc4200d40f85e4dd4f5d7107d11",
      "pool": {
        "id": "0xe08829410408d6dfe3de446fd9596b11d2200294"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "USDC"
      },
      "account": {
        "id": "0x347f5f8553d68c09c305d537e4268936965a8f6e"
      }
    },
    {
      "timestamp": "1714678432",
      "amountInUSD": "0",
      "amountOutUSD": "27.30452041400219555743797",
      "amountIn": "9288031269756343",
      "amountOut": "9151090984547159",
      "hash": "0xc047f4ba017e2e2e87d6df6f1089367dcf718ce6460f806ea68f515fb307e053",
      "pool": {
        "id": "0x40cc6f68400958bf7225e8a762d3ad41c1064086"
      },
      "tokenIn": {
        "symbol": "ezETH"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0x4dc1f753d29b1b8553073fe7cf251dd30a51d028"
      }
    },
    {
      "timestamp": "1714678431",
      "amountInUSD": "0",
      "amountOutUSD": "0",
      "amountIn": "1055",
      "amountOut": "353198685392",
      "hash": "0x8bf8240bbecb9e02c3457c0a022ad6ed94decb618d1fe72855a44c747b0302c4",
      "pool": {
        "id": "0xc6962004f452be9203591991d15f6b388e09e8d0"
      },
      "tokenIn": {
        "symbol": "USDC"
      },
      "tokenOut": {
        "symbol": "WETH"
      },
      "account": {
        "id": "0xb8aa7f4b2923d85ec6896b08fe326c3d39ae3103"
      }
    }
]

def get_token_prices(tokens):
    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {
        'ids': ','.join(tokens),
        'vs_currencies': 'usd'
    }
    response = requests.get(url, params=params)
    return response.json()

tokens = set(txn['tokenIn']['symbol'] for txn in transactions) | set(txn['tokenOut']['symbol'] for txn in transactions)

current_prices = get_token_prices(tokens)

wallet_profits = {}

for txn in transactions:
    token_in = txn['tokenIn']['symbol']
    token_out = txn['tokenOut']['symbol']
    amount_in_usd = float(txn['amountInUSD'])
    amount_out_usd = float(txn['amountOutUSD'])
    wallet_id = txn['account']['id']
    
    if wallet_id not in wallet_profits:
        wallet_profits[wallet_id] = 0.0

    wallet_profits[wallet_id] += (amount_out_usd - amount_in_usd)
    
    current_price_in = current_prices.get(token_in, {}).get('usd', 0)
    unrealized_in = current_price_in * float(txn['amountIn'])
    
    current_price_out = current_prices.get(token_out, {}).get('usd', 0)
    unrealized_out = current_price_out * float(txn['amountOut'])

    wallet_profits[wallet_id] += (unrealized_out - unrealized_in)

top_wallets = sorted(wallet_profits.items(), key=lambda x: x[1], reverse=True)[:10]

for wallet, profit in top_wallets:
    print(f"Wallet {wallet} has a profit of ${profit:.2f}")
