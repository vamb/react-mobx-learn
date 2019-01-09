import React from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Form, Icon, Row, Col, Button, Select } from 'antd'
import Store from './Store'

const storeData = Store.storeData;

const MobsTableView =