import React, { Component } from 'react'
import {
	View,
	StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'

import TextPingFang from '../../components/TextPingFang'

import {
	WIDTH,
	HEIGHT,
	getResponsiveWidth,
	getResponsiveHeight
} from '../../common/styles'
import {
  getDay,
  getTime,
  getLocation,
  diaryClassify,
} from '../../common/util'
import { SCENE_DIARY_DETAIL } from '../../constants/scene'

class SingleDiary extends Component {
	static propTypes = {
		diary: PropTypes.object
	}

	state = {
		location: ''
	}

	async componentDidMount () {
		const location = await getLocation(this.props.diary.longitude, this.props.diary.latitude)
		this.setState({location: `${location.city}，${location.province}，${location.country}`})
	}

	render () {
		const diary = this.props.diary

		return (
			<TouchableOpacity
				style={styles.diary_container}
				onPress={() => Actions.jump(SCENE_DIARY_DETAIL, {diary: this.props.diary})}
			>
				<View style={styles.diary_top}>
					<View style={styles.diary_top_text}>
						<TextPingFang style={styles.text_diary_title} numberOfLines={1}>{diary.title}</TextPingFang>
						<TextPingFang style={styles.text_diary_content} numberOfLines={2}>{diary.content}</TextPingFang>
					</View>
					<Image style={[styles.img_diary, {display: diary.images ? 'flex' : 'none'}]} source={{uri: diary.images ? diary.images.split('&')[0] : ''}}/>
				</View>
				<View style={styles.diary_bottom}>
					<TextPingFang style={styles.time}>{getTime(diary.date)}</TextPingFang>
					<View style={styles.location_container}>
						<Image style={styles.location_icon} source={require('../../../res/images/home/icon_location.png')}/>
						<TextPingFang style={styles.text_location}>{this.state.location}</TextPingFang>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

export default class Diary extends Component {
	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.object).isRequired,
	}

  render () {
		let date = ''
		if (this.props.data.length !== 0) {
			date = getDay(this.props.data[0].date)
		}

    return (
      <View style={styles.container}>
				<TextPingFang style={styles.date}>{date}</TextPingFang>
				<View style={styles.main_container}>
					{
						this.props.data.map((diary, index) => {
							return (
								<SingleDiary key={index} diary={diary}/>
							)
						})
					}
				</View>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
		width: '100%',
		flexDirection: 'row',
		paddingBottom: getResponsiveWidth(16),
		backgroundColor: '#fff'
	},
	date: {
		paddingTop: getResponsiveWidth(16),
		color: '#aaa',
		fontSize: 14,
	},
	main_container: {
		flex: 1
	},
	diary_container: {
		marginLeft: getResponsiveWidth(24),
		paddingTop: getResponsiveWidth(16),
		paddingBottom: getResponsiveWidth(16),
		justifyContent: 'space-between',
		borderBottomWidth: getResponsiveWidth(1),
		borderBottomColor: '#f1f1f1'
	},
	diary_top: {
		// height: getResponsiveHeight(80),
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	diary_top_text: {
		flex: 1,
		height: getResponsiveWidth(72),
		paddingRight: getResponsiveWidth(10),
		justifyContent: 'space-between',
	},
	text_diary_title: {
		color: '#444',
		fontSize: 20
	},
	text_diary_content: {
		color: '#666',
		fontSize: 12,
	},
	img_diary: {
		width: getResponsiveWidth(72),
		height: getResponsiveWidth(72)
	},
	diary_bottom: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: getResponsiveWidth(16),
		paddingRight: getResponsiveWidth(10),
	},
	time: {
		color: '#000',
		fontSize: 12
	},
	location_container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	location_icon: {
		marginRight: getResponsiveWidth(8)
	},
	text_location: {
		color: '#aaa',
		fontSize: 10
	}
})
