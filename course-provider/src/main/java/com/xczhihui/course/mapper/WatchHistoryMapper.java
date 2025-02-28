package com.xczhihui.course.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.xczhihui.course.model.WatchHistory;
import com.xczhihui.course.vo.WatchHistoryVO;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author yuxin
 * @since 2017-12-09
 */
public interface WatchHistoryMapper extends BaseMapper<WatchHistory> {

    List<WatchHistoryVO> selectWatchHistory(@Param("page") Page<WatchHistoryVO> page, @Param("userId") String userId);

    WatchHistory findWatchHistoryByUserIdAndCourseId(@Param("userId") String userId, @Param("courseId") Integer courseId);

    WatchHistory findWatchHistoryByUserIdAndCollectionId(@Param("userId") String userId,
                                                         @Param("collectionId") Integer CollectionId);

    void deleteBatch(@Param("list") List<WatchHistory> list);

    List<WatchHistory> findWatchHistoryByUserId(@Param("userId") String userId);

    void deleteWatchHistoryByUserId(@Param("userId") String userId);

    int insertApplyRGradeCourse(@Param("id") String id,
                                @Param("courseId") Integer courseId,
                                @Param("userId") String userId);

    int insertWatchHistory(@Param("courseId") Integer courseId, @Param("userId") String userId, @Param("userLecturerId") String userLecturerId, @Param("collectionId") Integer collectionId);
}