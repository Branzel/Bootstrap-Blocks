/**
 * BLOCK: profile
 *
 */

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { getColorClassName, RichText } from 'wp.editor';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import edit from './edit';

const blockAttributes = {
	theme: {
		type: 'string',
		default: 'BeMSABoard'
	},
	accentColor: {
		type: 'string',
	},
	// Todelete
	customAccentColor: {
		type: 'string',
	},
	title: {
		type: 'array',
		source: 'children',
		selector: 'h4',
	},
	subtitle: {
		type: 'array',
		source: 'children',
		selector: 'h5',
	},
	bio: {
		type: 'array',
		source: 'children',
		selector: 'p',
	},
	mediaID: {
		type: 'number',
	},
	mediaURL: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'src',
	},
	alignment: {
		type: 'string',
		default: 'center',
	},
	facebookURL: {
		type: 'url',
	},
	twitterURL: {
		type: 'url',
	},
	instagramURL: {
		type: 'url',
	},
	linkedURL: {
		type: 'url',
	},
	emailAddress: {
		type: 'text',
	}
};

registerBlockType( 'branzel/block-profile', {
	title: __( 'BeMSA Profile' ),
	description: __( 'A custom block for displaying personal profiles.' ),
	icon: 'businessman',
	category: 'common',
	attributes: blockAttributes,

	edit,

	save( { attributes, className } ) {
		const { 
			mediaURL, 
			mediaID, 
			title,
			subtitle,
			bio,
			alignment, 
			facebookURL, 
			twitterURL, 
			instagramURL, 
			linkedURL, 
			emailAddress,
			theme = 'BeMSABoard',
			accentColor,
			customAccentColor
		} = attributes;
		
		const accentBorderClass = getColorClassName( 'border', accentColor );
		const accentColorClass = getColorClassName( 'color', accentColor );
		
		const classNameNew = classnames('col-sm-4', 'bemsatheme', {
			[ className ]: className,
		} );
		
		const socialLinkClassName = classnames('social-link', {
			[accentColorClass]:accentColorClass}
		);
		
		const socialLinkStyle = {
			color: ( accentColorClass ? undefined : customAccentColor )
		};
				
		if ( theme == 'BeMSABoard' ) {
			return (
				<div className={ classNameNew }>
					<div className={ classnames('container', {
							[accentBorderClass]:accentBorderClass}
						) }
						style={ { 
							border: '1px solid ' + ( accentBorderClass ? '' : customAccentColor )
						} }
					>
						<div className="row">
							<div className='col-xs-12 col-sm-12 branzel-profile-image'
								style={ mediaURL && {
									backgroundImage: 'url(' + mediaURL + ')' 
									} }
								>
								{ mediaURL && <img src={ mediaURL }/> }
							</div>
							<div className='col-xs-12 col-sm-12 branzel-profile-content'
								style={ { textAlign: alignment } }>
								<RichText.Content
									tagName='h4'
									value={ title }
								/>
								<RichText.Content
									tagName='h5'
									value={ subtitle }
								/>
								<RichText.Content
									tagName='p'
									value={ bio }
								/>
								<div className='branzel-profile-social'>
									{ facebookURL && <a 
										className={ socialLinkClassName }
										style={ socialLinkStyle }
										href={ facebookURL }
										target='_blank'
										><i className='fab fa-facebook-f'/>
										</a>
									}
									{ twitterURL && <a 
										className={ socialLinkClassName }
										style={ socialLinkStyle }
										href={ twitterURL }
										target='_blank'
										><i className='fab fa-twitter'/>
										</a>
									}
									{ instagramURL && <a 
										className={ socialLinkClassName }
										style={ socialLinkStyle }
										href={ instagramURL }
										target='_blank'
										><i className='fab fa-instagram'/>
										</a>
									}
									{ linkedURL && <a 
										className={ socialLinkClassName }
										style={ socialLinkStyle }
										href={ linkedURL }
										target='_blank'
										><i className='fab fa-linkedin-in'/>
										</a>
									}
									{ emailAddress && <a 
										className={ socialLinkClassName }
										style={ socialLinkStyle }
										href={ 'mailto:' + emailAddress }
										target='_blank'
										><i className='fas fa-envelope'/>
										</a>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		// } else if ( theme == 'BeMSAPrRes' ) {
		} else {
			return (
				<div className={ classnames("col-sm-6", { [className]: className }) }>
					<div className="container">
						<div className="row">
							{ mediaURL && <div className={ classnames('col-xs-12', 'col-sm-4', 'branzel-profile-image') }
									style={ {
										backgroundImage: 'url('+ mediaURL+')' 
									} }
								>
									<img src={ mediaURL }/>
								</div>
							}
							<div className='col-xs-12 col branzel-profile-content'
								style={ { textAlign: alignment } }>
								<RichText.Content
									tagName='h4'
									value={ title }
								/>
								<RichText.Content
									tagName='h5'
									value={ subtitle }
								/>
								<RichText.Content
									tagName='p'
									value={ bio }
								/>
								<div className='branzel-profile-social'>
									{ facebookURL && <a 
										className={ socialLinkClassName }
										style={ socialLinkStyle }
										href={ facebookURL }
										target='_blank'
										><i className='fab fa-facebook-f'/>
										</a>
									}
									{ twitterURL && <a 
										className={ socialLinkClassName }
										style={ socialLinkStyle }
										href={ twitterURL }
										target='_blank'
										><i className='fab fa-twitter'/>
										</a>
									}
									{ instagramURL && <a 
										className={ socialLinkClassName }
										style={ socialLinkStyle }
										href={ instagramURL }
										target='_blank'
										><i className='fab fa-instagram'/>
										</a>
									}
									{ linkedURL && <a 
										className={ socialLinkClassName }
										style={ socialLinkStyle }
										href={ linkedURL }
										target='_blank'
										><i className='fab fa-linkedin-in'/>
										</a>
									}
									{ emailAddress && <a 
										className={ socialLinkClassName }
										style={ socialLinkStyle }
										href={ 'mailto:' + emailAddress }
										target='_blank'
										><i className='fas fa-envelope'/>
										</a>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	},
	
	deprecated: [
		{
			attributes: {
				theme: {
					type: 'string',
					default: 'BeMSABoard'
				},
				accentColor: {
					type: 'string',
				},
				// Todelete
				customAccentColor: {
					type: 'string',
				},
				title: {
					type: 'array',
					source: 'children',
					selector: 'h3',
				},
				subtitle: {
					type: 'array',
					source: 'children',
					selector: 'h5',
				},
				bio: {
					type: 'array',
					source: 'children',
					selector: 'p',
				},
				mediaID: {
					type: 'number',
				},
				mediaURL: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'src',
				},
				alignment: {
					type: 'string',
					default: 'center',
				},
				facebookURL: {
					type: 'url',
				},
				twitterURL: {
					type: 'url',
				},
				instagramURL: {
					type: 'url',
				},
				linkedURL: {
					type: 'url',
				},
				emailAddress: {
					type: 'text',
				}
			},

			save( { attributes, className } ) {
				const { 
					mediaURL, 
					mediaID, 
					title,
					subtitle,
					bio,
					alignment, 
					facebookURL, 
					twitterURL, 
					instagramURL, 
					linkedURL, 
					emailAddress,
					theme = 'BeMSABoard',
					accentColor,
					customAccentColor
				} = attributes;
				
				const accentBorderClass = getColorClassName( 'border', accentColor );
				const accentColorClass = getColorClassName( 'color', accentColor );
				
				const classNameNew = classnames('col-sm-4', 'bemsatheme', {
					[ className ]: className,
				} );
				
				const socialLinkClassName = classnames('social-link', {
					[accentColorClass]:accentColorClass}
				);
				
				const socialLinkStyle = {
					color: ( accentColorClass ? undefined : customAccentColor )
				};
						
				if ( theme == 'BeMSABoard' ) {
					return (
						<div className={ classNameNew }>
							<div className={ classnames('container', {
									[accentBorderClass]:accentBorderClass}
								) }
								style={ { 
									border: '1px solid ' + ( accentBorderClass ? '' : customAccentColor )
								} }
							>
								<div className="row">
									<div className='col-xs-12 col-sm-12 organic-profile-image'
										style={ mediaURL && {
											backgroundImage: 'url('+ mediaURL+')' 
											} }
										>
										{ mediaURL && <img src={ mediaURL }/> }
									</div>
									<div className='col-xs-12 col-sm-12 organic-profile-content'
										style={ { textAlign: alignment } }>
										<RichText.Content
											tagName='h3'
											value={ title }
										/>
										<RichText.Content
											tagName='h5'
											value={ subtitle }
										/>
										<RichText.Content
											tagName='p'
											value={ bio }
										/>
										<div className='organic-profile-social'>
											{ facebookURL && <a 
												className={ socialLinkClassName }
												style={ socialLinkStyle }
												href={ facebookURL }
												target='_blank'
												><i className='fab fa-facebook-f'/>
												</a>
											}
											{ twitterURL && <a 
												className={ socialLinkClassName }
												style={ socialLinkStyle }
												href={ twitterURL }
												target='_blank'
												><i className='fab fa-twitter'/>
												</a>
											}
											{ instagramURL && <a 
												className={ socialLinkClassName }
												style={ socialLinkStyle }
												href={ instagramURL }
												target='_blank'
												><i className='fab fa-instagram'/>
												</a>
											}
											{ linkedURL && <a 
												className={ socialLinkClassName }
												style={ socialLinkStyle }
												href={ linkedURL }
												target='_blank'
												><i className='fab fa-linkedin-in'/>
												</a>
											}
											{ emailAddress && <a 
												className={ socialLinkClassName }
												style={ socialLinkStyle }
												href={ 'mailto:' + emailAddress }
												target='_blank'
												><i className='fas fa-envelope'/>
												</a>
											}
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				} else if ( theme == 'BeMSAPrRes' ) {
					return (
						<div className={ "col-sm-6 " + ( className ? " " + className : '' ) }>
							<div className="container">
								<div className="row">
									{ mediaURL && <div className='col-xs-12 col-sm-4 organic-profile-image'
											style={ {
												backgroundImage: 'url('+ mediaURL+')' 
											} }
										>
											<img src={ mediaURL }/>
										</div>
									}
									<div className='col-xs-12 col organic-profile-content'
										style={ { textAlign: alignment } }>
										<RichText.Content
											tagName='h3'
											value={ title }
										/>
										<RichText.Content
											tagName='h5'
											value={ subtitle }
										/>
										<RichText.Content
											tagName='p'
											value={ bio }
										/>
										<div className='organic-profile-social'>
											{ facebookURL && <a 
												className={ socialLinkClassName }
												style={ socialLinkStyle }
												href={ facebookURL }
												target='_blank'
												><i className='fab fa-facebook-f'/>
												</a>
											}
											{ twitterURL && <a 
												className={ socialLinkClassName }
												style={ socialLinkStyle }
												href={ twitterURL }
												target='_blank'
												><i className='fab fa-twitter'/>
												</a>
											}
											{ instagramURL && <a 
												className={ socialLinkClassName }
												style={ socialLinkStyle }
												href={ instagramURL }
												target='_blank'
												><i className='fab fa-instagram'/>
												</a>
											}
											{ linkedURL && <a 
												className={ socialLinkClassName }
												style={ socialLinkStyle }
												href={ linkedURL }
												target='_blank'
												><i className='fab fa-linkedin-in'/>
												</a>
											}
											{ emailAddress && <a 
												className={ socialLinkClassName }
												style={ socialLinkStyle }
												href={ 'mailto:' + emailAddress }
												target='_blank'
												><i className='fas fa-envelope'/>
												</a>
											}
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				}
				
				return (
					<div className={ "col-sm-4 " + ( className ? " " + className : '' ) }>
						<div className="container">
							<div className="row">
								{ mediaURL && <div className='col-xs-12 col-sm-4 organic-profile-image'
										style={ {
											backgroundImage: 'url('+ mediaURL+')' 
										} }
									>
										<img src={ mediaURL }/>
									</div>
								}
								<div className='col-xs-12 col organic-profile-content'
									style={ { textAlign: alignment } }>
									<RichText.Content
										tagName='h3'
										value={ title }
									/>
									<RichText.Content
										tagName='h5'
										value={ subtitle }
									/>
									<RichText.Content
										tagName='p'
										value={ bio }
									/>
									<div className='organic-profile-social'>
										{ facebookURL && <a 
											className='social-link'
											href={ facebookURL }
											target='_blank'
											><i className='fab fa-facebook-f'/>
											</a>
										}
										{ twitterURL && <a 
											className='social-link'
											href={ twitterURL }
											target='_blank'
											><i className='fab fa-twitter'/>
											</a>
										}
										{ instagramURL && <a 
											className='social-link'
											href={ instagramURL }
											target='_blank'
											><i className='fab fa-instagram'/>
											</a>
										}
										{ linkedURL && <a 
											className='social-link'
											href={ linkedURL }
											target='_blank'
											><i className='fab fa-linkedin-in'/>
											</a>
										}
										{ emailAddress && <a 
											className='social-link'
											href={ 'mailto:' + emailAddress }
											target='_blank'
											><i className='fas fa-envelope'/>
											</a>
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			}
		}
	]
} );