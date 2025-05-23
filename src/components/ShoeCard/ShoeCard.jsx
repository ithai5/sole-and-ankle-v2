import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
  const flagText = variant === 'on-sale' ? 'Sale' : 'new-release'? 'Just Released!': "";
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper >
          <Image alt="" src={imageSrc} />
          <Flag variant={variant}>{flagText}</Flag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice/>
        </Row>
      </Wrapper>
    </Link>
  );
};


const Flag = styled.span`
    position: absolute;
    z-index: 1;
    top: 16px;
    right: -4px;
    background: ${(props)=> props.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
    padding: 4px 8px;
    border-radius: 4px;
    color: ${COLORS.white};
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 300px;
`;

const Wrapper = styled.article`
    position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
    width: 100%;
    //position: absolute;
`;

const Row = styled.div`
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
